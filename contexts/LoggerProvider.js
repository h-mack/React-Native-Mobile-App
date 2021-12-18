import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoggerContext = createContext();

function addEvent(event, state, setState) {
    let objIndex = state.findIndex((obj) => obj.event === event);
    setState((x) => {
        x[objIndex].data.push(new Date().getTime());
        AsyncStorage.setItem("@Log", JSON.stringify(state));
        return [...x];
    });
}

export const LoggerProvider = ({ children }) => {
    const [state, setState] = useState([
        { event: 'Chocolate', data: [] },
        { event: 'Coffee', data: [] },
        { event: 'Fruit', data: [] },
        { event: 'Walk', data: [] },
    ]);

    let _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("@Log");
            console.log("Retrieved LOG");
            if (value !== null) {
                // We have data!
                setState(JSON.parse(value));
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    useEffect(() => {
        _retrieveData();
    }, []);

    return (
        <LoggerContext.Provider value={[state, setState, (x) => addEvent(x, state, setState)]}>
            {children}
        </LoggerContext.Provider>
    );
}