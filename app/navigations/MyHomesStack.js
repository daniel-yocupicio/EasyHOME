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
import AddReviewHome from '../screens/AddReviewHome'
import Home from '../screens/Home'

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
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    title: "Casa",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="homeEdit"
                component={EditHome}
                options={{
                    title: "Editar casa",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="add-review-home"
                component={AddReviewHome}
                options={{
                    title: "Comentario",
                    headerStyle: {
                        backgroundColor: "#2471A3",
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}