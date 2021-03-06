/*
    RegisterForm.js

    Componente del formulario para registrar una cuenta nueva
*/

// Módulos de npm
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { size, isEmpty } from 'lodash';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

// Componentes creados
import Loading from '../Loading';

// Función RegisterForm
export default function RegisterForm(props) {

    //Hooks de useState para almacenar datos
    const [mostrarClave, updateBandera] = useState(false);
    const [mostrarClave2, updateBandera2] = useState(false);
    const [datos, updateData] = useState(defaultValue);
    const [error1, updateError1] = useState(false);
    const [error2, updateError2] = useState(false);
    const [error3, updateError3] = useState(false);
    const [errorRegister, updateErrorRegister] = useState(false);
    const [Load, updateLoading]=useState(false);

    // Objeto para navegar a otras vistas
    const navigation = useNavigation();

    // Función para modificar un dato del useState "datos"
    const onChange = (e, type) => {
        updateData({ ...datos, [type]: e.nativeEvent.text });
    }

    // Función para mandar petición y crear nueva cuenta
    const submit = () => {
        updateLoading(true);
        firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password).
            then(response => {
                updateLoading(false);
                navigation.navigate("account");
            }).catch(err => {
                updateLoading(false);
                updateErrorRegister(true);
            });
    }

    // Función para validar campos o inputs
    const validateData = () => {
        if (datos.password==="" || size(datos.password) < 6) {
            updateError2(true);
        } else updateError2(false);
        if (datos.password !== datos.repeatPassword) {
            updateError3(true);
        } else updateError3(false);
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(datos.email)) {
            updateError1(false);
        } else updateError1(true);
        if (!error1 && !error2 && !error3) {
            submit();
        }
    }

    // Componente para mostrar un error
    const Error = () => {
        return (
            <View style={styles.viewError}>
                <Icon type="material-community" name="alert-box-outline" size={40} color="#B03A2E" />
                <Text style={styles.textorojo}>Error al intentar registrar la cuenta</Text>
            </View>
        );
    }

    // Retornamos el KeyboardAwareScrollView
    return (

        <KeyboardAwareScrollView>
            <View style={styles.view}>
                <Input
                    placeholder="Correo electronico"
                    style={styles.inputForm}
                    onChange={(e, a) => onChange(e, "email")}
                    rightIcon={
                        <Icon type="material-community" name="at" iconStyle={styles.icon} size={40} />
                    }
                    errorStyle={error1 ? { color: 'red' } : null}
                    errorMessage={error1 ? "Ingrese un correo valido" : null}
                />
                <Input
                    placeholder="Contraseña"
                    style={styles.inputForm}
                    password={!mostrarClave}
                    secureTextEntry={!mostrarClave}
                    onChange={(e, a) => onChange(e, "password")}
                    rightIcon={
                        !mostrarClave ?
                            <Icon type="material-community" name="lock" iconStyle={styles.icon} size={35} onPress={() => updateBandera(true)} /> :
                            <Icon type="material-community" name="eye" iconStyle={styles.icon} size={35} onPress={() => updateBandera(false)} />
                    }
                    errorStyle={error2 ? { color: 'red' } : null}
                    errorMessage={error2 ? "Ingrese una clave valida" : null}
                />
                <Input
                    placeholder="Repetir contraseña"
                    style={styles.inputForm}
                    password={!mostrarClave2}
                    secureTextEntry={!mostrarClave2}
                    onChange={(e, a) => onChange(e, "repeatPassword")}
                    rightIcon={
                        !mostrarClave2 ?
                            <Icon type="material-community" name="lock" iconStyle={styles.icon} size={35} onPress={() => updateBandera2(true)} /> :
                            <Icon type="material-community" name="eye" iconStyle={styles.icon} size={35} onPress={() => updateBandera2(false)} />
                    }
                    errorStyle={error3 ? { color: 'red' } : null}
                    errorMessage={error3 ? "Contraseñas diferentes" : null}
                />
            </View>
            <Button
                title="Registrarme"
                containerStyle={styles.btn}
                buttonStyle={styles.btnregister}
                onPress={() => validateData()}
            />

            <Loading isVisible={Load} text="Creando cuenta..." />

            <View style={styles.view2}>
                {errorRegister ? <Error /> : null}
            </View>
        </KeyboardAwareScrollView>

    );
}

// Función para retornar el valor inicial de el useState "datos"
function defaultValue() {
    return {
        email: "",
        password: "",
        repeatPassword: ""
    }
}

// Objeto de estilos
const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        marginTop: 20,
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    btn: {
        marginTop: 40
    },
    btnregister: {
        backgroundColor: "#2471A3"
    },
    icon: {
        marginRight: "10%"
    },
    view2: {
        marginTop: 20
    },
    viewError: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        alignContent: "center"
    },
    textorojo: {
        color: "#B03A2E"
    }
});
