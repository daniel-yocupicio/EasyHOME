/*
    Boton.js

    Componente de boton agregar una casa, sirve para que al aplastar se pueda navegar a SaveHome
*/

// Módulos npm
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// Función Boton
export default function Boton() {

    // objeto de navigation
    const navigation = useNavigation();

    // Retornamos el Icon
    return (
        <Icon
            reverse
            type="material-community"
            name="plus"
            color="#2471A3"
            containerStyle={styles.btnContainer}
            onPress={() => navigation.navigate("savehome")}
        />
    );
}

// Objeto de estilos
const styles = StyleSheet.create({
    viewBody: {
        backgroundColor: "#fff",
    },
    btnContainer: {
        position: "absolute",
        right: 10,
        shadowColor: "black",
        top: (Dimensions.get('window').height) - (Dimensions.get('window').height / 3.3),
    }
})