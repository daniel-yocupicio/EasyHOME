import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from '../screens/Favorites/Favorites';
import Login from '../screens/Account/Login';

const Stack = createStackNavigator();

export default function FavoritesStack() {
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