/*
    MyHomesStack.js

    Archivo que contiene los Stack de las vistas relacionadas con Mis casas.
*/

// Módulos de npm
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Vistas creadas
import MyHomes from '../screens/MyHomes/MyHomes';
import EditHome from '../screens/MyHomes/EditHome';
import SaveHome from '../screens/MyHomes/SaveHome';

// Componente Stack creado con la función createStackNavigator()
const Stack = createStackNavigator();

// Función MyHomesStack
export default function MyHomesStack() {

    // Retornamos los Stacks
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