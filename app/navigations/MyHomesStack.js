import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyHomes from '../screens/MyHomes/MyHomes';
import EditHome from '../screens/MyHomes/EditHome';
import SaveHome from '../screens/MyHomes/SaveHome';

const Stack = createStackNavigator();

export default function MyHomesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="myHomes"
                component={MyHomes}
                options={{
                    title: "Mis Casas",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="savehome"
                component={SaveHome}
                options={{
                    title: "Guardar Casa",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}