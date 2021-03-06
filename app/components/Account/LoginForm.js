// Módulos de npm
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { size } from 'lodash';

// Componente Loading
import Loading from '../Loading';

// Funión RegisterForm
export default function RegisterForm(props) {

    // useState para almacenar datos
    const [mostrarClave, updateBandera] = useState(false);
    const [datos, updateData] = useState(defaultValue);
    const [errorLog, updateErrorLog] = useState(false);
    const [error1, updateError1]=useState(false);
    const [error2, updateError2]=useState(false);
    const [load, updateLoad]=useState(false);

    // Objeto para navegar a otras vistas
    const navigation = useNavigation();

    // Destructuring de mis props
    let { CreateAccount } = props

    // Función para cambiar useState datos
    const onChange = (e, type) => {
        updateData({ ...datos, [type]: e.nativeEvent.text });
    }

    // Componente de Error
    const Error = () => {
        return (
            <View style={styles.viewError}>
                <Icon type="material-community" name="alert-box-outline" size={40} color="#B03A2E" />
                <Text style={styles.textorojo}>Error al intentar loguear.</Text>
            </View>
        );
    }

    // Mandamos la petición para iniciar sesión
    const submit=()=>{
        updateLoad(true);
        firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
        .then(()=>{
            updateLoad(false);
            navigation.navigate("account");
        }).catch((e)=>{
            updateErrorLog(true)
            updateLoad(false);
        })
    }

    // Validamos los campos de información
    const validateData = () => {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(datos.email)) {
            updateError1(false);
        } else updateError1(true);
        if (datos.password==="" || size(datos.password) < 6) {
            updateError2(true);
        } else updateError2(false);
        if (!error1 && !error2) {
           submit();
        }else updateErrorLog(true);
    }

    // Retornamos el View
    return (
        <View>
            <View style={styles.view}>
                <Icon type="material-community" name="home-account" size={270} color="#2471A3" />
                <Text style={styles.text}>Login</Text>
            </View>
            <View style={styles.view}>
                    <Input
                        placeholder="Correo electronico"
                        style={styles.inputForm}
                        rightIcon={
                            <Icon type="material-community" name="at" iconStyle={styles.icon} size={40} />
                        }
                        onChange={(e, a) => onChange(e, "email")}
                    />
                    <Input
                        placeholder="Contraseña"
                        style={styles.inputForm}
                        password={!mostrarClave}
                        secureTextEntry={!mostrarClave}
                        rightIcon={
                            !mostrarClave ?
                                <Icon type="material-community" name="lock" iconStyle={styles.icon} size={35} onPress={() => updateBandera(true)} /> :
                                <Icon type="material-community" name="eye" iconStyle={styles.icon} size={35} onPress={() => updateBandera(false)} />
                        }
                        onChange={(e, a) => onChange(e, "password")}
                    />
                    {errorLog ? <Error /> : null }
                </View>
            <View style={styles.view}>
                <Button
                    title="Login"
                    buttonStyle={styles.btn}
                    containerStyle={styles.btncontainer}
                    onPress={() => validateData()}
                />
                <CreateAccount />
            </View>
            <Loading isVisible={load} text="Verificando cuenta..." />
        </View>
    );
}

// Función para inicializar los valores del useState datos
function defaultValue() {
    return {
        email: "",
        password: "",
    }
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
        marginTop: -50,
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
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    viewForm:{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    icon: {
        marginRight: "10%"
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