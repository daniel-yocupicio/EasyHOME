/*
    FavoritesStack.js

    Archivo que contiene los Stack de las vistas relacionadas con favoritos.
*/

// Módulos de npm
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Vistas creadas
import Favorites from '../screens/Favorites/Favorites';

// Componente Stack creado con la función createStackNavigator()
const Stack = createStackNavigator();

// Función FavoritesStack
export default function FavoritesStack() {

    // Retornamos los Stacks
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="favorites"
                component={Favorites}
                options={{
                    title: "Favoritos",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}