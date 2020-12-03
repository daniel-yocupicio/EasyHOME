import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { size, isEmpty } from 'lodash';
import Loading from './Loading';

export default function RegisterForm(props) {

    const [mostrarClave, updateBandera] = useState(false);
    const [datos, updateData] = useState(defaultValue);
    const [errorLog, updateErrorLog] = useState(false);
    const [error1, updateError1]=useState(false);
    const [error2, updateError2]=useState(false);
    const [load, updateLoad]=useState(false);

    const navigation = useNavigation();

    let { CreateAccount } = props

    const onChange = (e, type) => {
        updateData({ ...datos, [type]: e.nativeEvent.text });
    }

    const Error = () => {
        return (
            <View style={styles.viewError}>
                <Icon type="material-community" name="alert-box-outline" size={40} color="#B03A2E" />
                <Text style={styles.textorojo}>Error al intentar loguear.</Text>
            </View>
        );
    }

    const submit=()=>{
        updateLoad(true);
        firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
        .then(()=>{
            updateLoad(false);
            navigation.navigate("account");
        }).catch((e)=>{
            updateErrorLog(true)
            updateLoad(false);
            console.log(datos.email,datos.password,e)
        })
    }

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

function defaultValue() {
    return {
        email: "",
        password: "",
    }
}

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