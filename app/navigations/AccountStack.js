/*
    AccountStack.js

    Archivo que contiene los Stack de las vistas relacionadas con cuenta.
*/

// Módulos de npm
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Vistas creadas
import Account from '../screens/Account/Account';
import Login from '../screens/Account/Login';
import Register from '../screens/Account/Register';

// Componente creado con la función createStackNavigator
const Stack = createStackNavigator();

// Función AccountStack
export default function AccountStack() {

    // Retornamos los Stacks
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