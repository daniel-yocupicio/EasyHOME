/*
    SearchStack.js

    Archivo que contiene los Stack de las vistas relacionadas con buscar.
*/

// Módulos de npm
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Vistas creadas
import Search from '../screens/Search';
import Home from '../screens/Home'

// Componente Stack creado con la función createStackNavigator()
const Stack = createStackNavigator();

// Función SearchStack
export default function SearchStack() {

    // Retornamos los Stacks
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
            <Stack.Screen
                name="homeSearch"
                component={Home}
                options={{
                    title: "Viendo datos de la casa",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}