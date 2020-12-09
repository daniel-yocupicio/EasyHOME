/*
    Bloqueado.js

    Componente el cual muestra un mensaje si no existe un usuario logueado
*/

// Módulos npm
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


// Función Bloqueado
export default function Bloqueado(props) {

    // objeto para navegar a otra vista
    const navigation = useNavigation();

    // Destructuring de los props
    let {msg} = props;

    // Retornamos el ScrollView
    return (
        <ScrollView
            centerContent={true}
        >
            <View style={styles.view}>
                <Icon type="material-community" name="shield-home" size={270} color="#2471A3" />
                <Text style={styles.text}>EasyHome</Text>
                <Text style={styles.descripcion}>
                   {msg} 
                </Text>
            </View>
            <View style={styles.view}>
                <Button 
                    title="Iniciar sesión"
                    buttonStyle={styles.btn}
                    containerStyle={styles.btncontainer}
                    onPress={()=> navigation.navigate("account")}
                />
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
        marginTop: 20
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
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20
    },
    btn: {
        backgroundColor: "#2471A3",
        marginTop: 20
    },
    btncontainer: {
        width: "70%"
    }
});