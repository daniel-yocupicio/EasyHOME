import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Homes from '../screens/Homes';
import Home from '../screens/Home';

const Stack = createStackNavigator();

export default function HomesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="homes"
                component={Homes}
                options={{
                    title: "Casas",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}