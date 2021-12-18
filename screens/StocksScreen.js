import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export default function StocksScreen() {
    const navigation = useNavigation();
    return (
        <Text>Stocks Screen</Text>
    );
}