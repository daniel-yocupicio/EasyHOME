/*
    UseGuest.js

    Componente que muestra dos botones para navegar a la vista de login o a la vista de registrar
    cuenta nueva.
*/

// Módilos de npm
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// Función UserGuest
export default function UserGuest() {

    // Iniciamos objeto navigation con la función useNavigation
    const navigation = useNavigation();

    // Retornar el ScrollView
    return (
        <ScrollView
            centerContent={true}
        >
            <View style={styles.view}>
                <Icon type="material-community" name="shield-home" size={270} color="#2471A3" />
                <Text style={styles.text}>EasyHome</Text>
                <Text style={styles.descripcion}>
                    ¿Cansado de no encontrar una casa? EasyHome es para ti, buscar una casa nunca fue tan fácil.
                </Text>
            </View>
            <View style={styles.view}>
                <Button 
                    title="Iniciar sesión"
                    buttonStyle={styles.btn}
                    containerStyle={styles.btncontainer}
                    onPress={()=> navigation.navigate("login")}
                />
                                <Button 
                    title="Registrarme"
                    buttonStyle={styles.btn}
                    containerStyle={styles.btncontainer}
                    onPress={()=> navigation.navigate("register")}
                />
            </View>
            <View style={styles.view2}>

            </View>
        </ScrollView>
    );
}

// Objeto de estilos
const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },
    text: {
        color: "#2471A3",
        marginTop: -10,
        fontSize: 50,
    },
    descripcion: {
        color: "#000",
        fontSize: 20,
        textAlign: "center",
        marginTop: 50
    },
    btn: {
        backgroundColor: "#2471A3",
        marginTop: 20
    },
    btncontainer: {
        width: "70%"
    },
    view2: {
        marginTop: 20
    }
});