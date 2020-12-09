/*
    Loading.js

    Componente que muestra un overlay con un mensaje
*/

// Módulos npm
import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';

// Función Loading
export default function Loading(props) {

    // Destructuring de los props
    let { isVisible, text } = props;

    // Retornamos el Overlay
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        >
            <View
                style={styles.view}
            >
                <ActivityIndicator size="large" color="#1A5276" />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    );
}

// Objeto de estilos
const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#A9CCE3",
        borderWidth: 2,
        borderRadius: 10,
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#000",
        textTransform:"uppercase",
        marginTop: 10,
    }
});