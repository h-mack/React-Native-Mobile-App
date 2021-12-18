import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import SearchBar from '../components/SearchBar';
import {AgGridReact} from "ag-grid-react";

// export default function SearchScreen() {
//     const navigation = useNavigation();
//     return (
//         <Text>Search Screen</Text>
//     );
// }

export default class Stocks extends React.Component {
  navigation = useNavigation();
  constructor(props) {
    super(props)
    this.state = {
      filter: {"value": "all"},
      columns: [
        {headerName: "Symbol", field: "symbol", sortable: true, filter: true},
        {headerName: "Name", field: "name", sortable: true, filter: true},
        {headerName: "Industry", field: "industry", sortable: true, filter: true}
      ],
      rowData: []
    }
    this.update = this.update.bind(this)
    this.setFilter = this.setFilter.bind(this)
  }
  update() {
    // console.log used for testing in browser console
    // decided to keep it included in the code to show my testing and troubleshooting
    console.log("Updating with filter ",this.state.filter.value, this)
    // fetching the '/all' endpoint dataset
    if (this.state.filter.value==='all') {
      fetch(`http://172.22.25.5:3000/all`)
      .then(res => res.json())
      .then(data => data)
      .then(item => item.map(item => {
        return {
          symbol: item.symbol,
          name: item.name,
          industry: item.industry,
        }
      }))
      .then(stocks => this.setState({rowData: stocks}));
    } else {
      // fetching the /industry?industry=xxx dataset
      // encodeURI to make inputs with unusual characters and spaces such as 'Health Care' work
      // filters dataset by input value
      fetch(`http://172.22.25.5:3000/industry?industry=${encodeURI(this.state.filter.value)}`)
      .then(res => res.json())
      .then(data => data)
      // creates a new Map using symbol as the identifier value to create an array of unique values
      .then(data => [...new Map(data.map(item => [item["symbol"], item])).values()])
      .then(stocks => this.setState({rowData: stocks}));
    }
  }
  setFilter(value) {
    // console.log used for testing in browser console
    // decided to keep it included in the code to show my testing and troubleshooting
    console.log(value)
    this.setState({filter: value}, () => this.update())
  }
  componentDidMount() {
    this.update();
  }
  // What is actually rendered on the ./stocks webpage
  render() {
    return (
      <div className="container">
        <h4>Select Stock</h4>
        <SearchBar setFilter={this.setFilter} />
        <br/>
        <p>
        Showing stocks for 10/3/2020
        </p>
        {/*This div is the actual table being displayed*/}
        <div
          className="ag-theme-balham"
          style={{
            height: '650px',
            width: '620px'
          }}
        >
          <AgGridReact columnDefs={this.state.columns} rowData={this.state.rowData}/>
        </div>
        <p><small>Note: You will need to be connected to the QUT VPN to 
          access this dataset.</small></p>
      </div>
    );
  }
}