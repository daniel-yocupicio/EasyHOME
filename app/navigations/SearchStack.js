import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../screens/Search';
import Home from '../screens/Home';

const Stack = createStackNavigator();

export default function HomesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="search"
                component={Search}
                options={{
                    title: "Buscar Casas",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}