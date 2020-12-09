/*
    InputPass.js

    Componente que contiene los inputs para cambiar la contraseña de la cuenta
*/

// Módulos npm
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import { reauthenticate } from '../../utils/api'

// Función InputPass
export default function InputPass(props) {

    // Hooks de useState para almacenar datos
    const { cancelar3, userInfo, loadFalse, loadTrue} = props;
    const [email, updateEmail] = useState(userInfo.email);
    const [pass, updatePass] = useState("");
    const [newPass, updateNewPass] = useState("");
    const [error1, updateError1] = useState(false);
    const [error2, updateError2] = useState(false);
    const [error3, updateError3] = useState(false);
    const [error4, updateError4] = useState(false);
    const [mostrarClave, updateBandera] = useState(false);
    const [mostrarClave2, updateBandera2] = useState(false);

    // Función para cambiar el valor de email
    const changeEmail = (e) => {
        updateEmail(e.nativeEvent.text);
    }

    // Función para cambiar el valor de pass
    const changePass = (e) => {
        updatePass(e.nativeEvent.text);
    }

    // Función para cambiar el valor de newPass
    const changeNewPass = (e) => {
        updateNewPass(e.nativeEvent.text);
    }

    // Función para validar los inputs y mandar la petición
    const validateNewPass = async () => {
        loadTrue();
        if (pass==="" || pass.length < 6) {
            updateError2(true);
            loadFalse();
        } else {
            updateError2(false);
        }
        if (newPass === "" || newPass < 6) {
            updateError3(true);
            loadFalse();
        } else {
            updateError3(false);
        }
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
            if(userInfo.email===email){
                updateError1(false);
            }else{
                updateError1(true);
                loadFalse();
            }
        } else {
            updateError1(true);
            loadFalse();
        }
        if (!error1 && !error2 && !error3) {
            await reauthenticate(pass).then(()=>{
                firebase.auth().currentUser.updatePassword(newPass).then(()=>{
                    loadFalse();
                    cancelar3();
                }).catch(()=>{
                    updateError4(true);
                    loadFalse();
                })
            }).catch(()=>{
                updateError4(true);
                loadFalse();
            })
        }
    }

    // Componente Error
    const Error = () => {
        return (
            <View style={styles.viewError}>
                <Icon type="material-community" name="alert-box-outline" size={30} color="#B03A2E" />
                <Text style={styles.textorojo}>Error al intentar cambiar contraseña</Text>
            </View>
        );
    }

    // Retornamos el View
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingrese email"
                onChange={(e) => changeEmail(e)}
                rightIcon={
                    <Icon type="material-community" name="at" iconStyle={styles.icon} size={40} />
                }
                errorStyle={error1 ? { color: 'red' } : null}
                errorMessage={error1 ? "Ingrese correo valido" : null}
                defaultValue={userInfo.email}
            />
            <Input
                placeholder="Ingrese contraseña actual"
                onChange={(e) => changePass(e)}
                password={!mostrarClave}
                secureTextEntry={!mostrarClave}
                rightIcon={
                    !mostrarClave ?
                        <Icon type="material-community" name="lock" iconStyle={styles.icon} size={35} onPress={() => updateBandera(true)} /> :
                        <Icon type="material-community" name="eye" iconStyle={styles.icon} size={35} onPress={() => updateBandera(false)} />
                }
                errorStyle={error2 ? { color: 'red' } : null}
                errorMessage={error2 ? "Ingrese contraseña valida" : null}
            />
            <Input
                placeholder="Ingrese nueva contraseña"
                onChange={(e) => changeNewPass(e)}
                password={!mostrarClave2}
                secureTextEntry={!mostrarClave2}
                rightIcon={
                    !mostrarClave2 ?
                        <Icon type="material-community" name="lock" iconStyle={styles.icon} size={35} onPress={() => updateBandera2(true)} /> :
                        <Icon type="material-community" name="eye" iconStyle={styles.icon} size={35} onPress={() => updateBandera2(false)} />
                }
                errorStyle={error3 ? { color: 'red' } : null}
                errorMessage={error3 ? "Ingrese contraseña valida" : null}
            />
            {error4 ? <Error /> : null}
            <View style={styles.viewBtn}>
                <Button
                    title="Cambiar"
                    buttonStyle={styles.btn}
                    onPress={() => validateNewPass()}
                />
                <Button
                    title="Cancelar"
                    buttonStyle={styles.btnCancelar}
                    onPress={() => cancelar3()}
                />
            </View>
        </View>
    );
}

// Objeto de estilos
const styles = StyleSheet.create({
    view: {
        marginTop: 20,
        marginBottom: 20
    },
    viewBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10
    },
    btn: {
        width: "85%"
    },
    btnCancelar: {
        backgroundColor: "#C0392B",
        width: "85%"
    },
    viewError: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        alignContent: "center",
        marginBottom: 10,
        marginLeft: 10
    },
    textorojo: {
        color: "#B03A2E"
    }
})