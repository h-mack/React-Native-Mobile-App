import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import SearchScreen from '../screens/SearchScreen';
import Stocks from '../screens/SearchScreen';
import StocksScreen from '../screens/StocksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
    React.useLayoutEffect(() => {
        if (navigation != null) {
            navigation.setOptions({ headerTitle: getHeaderTitle(route) });
        }
    }, []);
    
    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
            name='Home'
            component={StocksScreen}
            options={{
                title: 'Stocks',
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon focused={focused} name='trending-up'/>
                    ),
                }}
            />
            <BottomTab.Screen
            name='StockSearch'
            component={Stocks}
            options={{
                title: 'Search',
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon focused={focused} name='search'/>
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return 'Stocks Page';
        case 'StockSearch':
            return 'Search Page';
    }
}