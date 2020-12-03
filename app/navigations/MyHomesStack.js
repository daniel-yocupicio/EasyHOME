import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyHomes from '../screens/MyHomes/MyHomes';
import EditHome from '../screens/MyHomes/EditHome';
import Login from '../screens/Account/Login';

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
                name="login"
                component={Login}
                options={{
                    title: "Iniciar sesión",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}