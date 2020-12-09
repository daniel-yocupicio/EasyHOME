/*
    Navigation.js

    Este componente se pone en App.js, sirve para poder navegar entre los stacks creados.

    contiene 4 stacks:
        account
        myHomes
        favorites
        search
*/

// Módulos de npm
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

// Stacks para navegar entre las diferentes vistas del sistema
import SearchStack from './SearchStack';
import FavoritesStack from './FavoritesStack';
import MyHomesStack from './MyHomesStack';
import AccountStack from './AccountStack';

// Componente Tab creado con la función createBottomTabNavigator
const Tab = createBottomTabNavigator();

// Función Navigation
export default function Navigation() {
    // Retornamos el NavigatorContainer
    return (

        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="account"
                tabBarOptions={{
                    inactiveTintColor: "#5D6D7E",
                    activeTintColor: "#fff",
                    inactiveBackgroundColor: "#D4E6F1",
                    activeBackgroundColor: "#2471A3",
                    
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                })}
            >

                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options={{ title: "Buscar" }} />

                <Tab.Screen
                    name="favorites"
                    component={FavoritesStack}
                    options={{ title: "Favoritos" }} />

                <Tab.Screen
                    name="myHomes"
                    component={MyHomesStack}
                    options={{ title: "Mis Casas" }} />

                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{ title: "Mi cuenta" }} />

            </Tab.Navigator>
        </NavigationContainer>

    );
}

// Función para poner los iconos en la barra para navegar.
function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case "search":
            iconName = "magnify";
            break;
        case "favorites":
            iconName = "star-circle";
            break;
        case "myHomes":
            iconName = "home-group";
            break;
        case "account":
            iconName = "account-circle";
            break;
        default:
            break;
    }
    // Retornamos el componente Icon
    return (
        <Icon type="material-community" name={iconName} size={27} color={color}/>
    )
}