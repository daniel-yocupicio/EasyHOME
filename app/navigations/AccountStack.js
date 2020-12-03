import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../screens/Account/Account';
import Login from '../screens/Account/Login';
import Bloqueado from '../screens/Bloqueado';
import Register from '../screens/Account/Register';

const Stack = createStackNavigator();

export default function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
                options={{
                    title: "Mi Cuenta",
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
            <Stack.Screen
                name="bloqueado"
                component={Bloqueado}
                options={{
                    title: "Bloqueado",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{
                    title: "Registrar",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}