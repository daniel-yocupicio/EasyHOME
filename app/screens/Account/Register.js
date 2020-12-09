/*
    Register.js

    Vista para registrar una cuenta nueva
*/

// Módulos de npm
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Componentes creados
import RegisterForm from '../../components/Account/RegisterForm';

// Función Register
export default function Register() {

    // Retornamos el KeyboardAwareScrollView
    return (
        <KeyboardAwareScrollView
            centerContent={true}
        >
            <View style={styles.view}>
                <View>
                <Icon   
                    type="material-community" name="shield-home" size={100} color="#2471A3"
                ></Icon>
                <Text style={styles.textlogo}>EasyHome</Text>
                </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.viewForm}>
                <RegisterForm />
            </View>

        </KeyboardAwareScrollView>
    );
}

// Objeto de estilos
const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    text: {
        color: "#2471A3",
        marginTop: 10,
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
    textregister: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        textAlign: "center"
    }, 
    btnRegister: {
        color: "#2471A3",
        fontSize: 20,
        
    },
    textlogo: {
        color: "#2471A3",
        marginTop: -5,
        fontSize: 20,
    },
    divider: {
        backgroundColor: "#85C1E9",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15
    },
    viewForm: {
        marginLeft: 25,
        marginRight: 25,
        marginTop: 20
    }
});