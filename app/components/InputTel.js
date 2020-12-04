import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import { reauthenticate } from '../utils/api';

export default function InputTel(props) {

    const { cancelar2, userInfo, loadFalse, loadTrue } = props;

    const [newTel, updateTel] = useState("");
    const [newPass, updatePass] = useState("");
    const [newEmail, updateEmail] = useState("");
    const [mostrarClave, updateBandera] = useState(false);
    const [error1, updateError1] = useState(false);
    const [error2, updateError2] = useState(false);
    const [error3, updateError3] = useState(false);
    const [error4, updateError4] = useState(false);

    const changeTel = (e) => {
        updateTel(e.nativeEvent.text);
        console.log(newTel);
    }

    const changePass = (e) => {
        updatePass(e.nativeEvent.text);
        console.log(newTel);
    }

    const changeEmail = (e) => {
        updateEmail(e.nativeEvent.text);
        console.log(newTel);
    }

    const validateT = () => {
        loadTrue();

        if (newTel.length > 6) {
            updateError1(false);
        } else {
            updateError1(true);
            loadFalse();
        }
        if (!error1) {
            loadFalse();
        }

    }

    const Error = () => {
        return (
            <View style={styles.viewError}>
                <Icon type="material-community" name="alert-box-outline" size={30} color="#B03A2E" />
                <Text style={styles.textorojo}>Error al intentar cambiar teléfono</Text>
            </View>
        );
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingrese nuevo teléfono"
                onChange={(e) => changeTel(e)}
                rightIcon={
                    <Icon type="material-community" name="cellphone" iconStyle={styles.icon} size={40} />
                }
                errorStyle={error1 ? { color: 'red' } : null}
                errorMessage={error1 ? "Ingrese un número valido" : null}
            />
            {error4 ? <Error /> : null}
            <View style={styles.viewBtn}>
                <Button
                    title="Cambiar"
                    buttonStyle={styles.btn}
                    onPress={() => validateT()}
                />
                <Button
                    title="Cancelar"
                    buttonStyle={styles.btnCancelar}
                    onPress={() => cancelar2()}
                />
            </View>
        </View>
    );
}

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