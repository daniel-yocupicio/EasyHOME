/*
    InputName.js

    Componente para poner los input para cambiar nombre de la cuenta, en este archivo se puede
    ver cosas que faltan borrar...
*/

// Módulos npm
import React, { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

// Función InputName
export default function InputName(props) {

    // Destructuring de los props
    const {cancelar, userInfo, loadFalse, loadTrue, tipo}=props;

    // Usamos hook useState para almacenar datos
    const [newName, updateName] = useState("");
    const [error1, updateError1] = useState(false);

    // Función para cambiar el hook useState de newName
    const changeName=(e)=>{
       updateName(e.nativeEvent.text);
    }

    // Validamos los campos
    const validateN=()=>{
        loadTrue();
        if(newName===""){
            updateError1(true);
            loadFalse();
        }else{
            if(tipo==="name"){
                submit();
            }else{
                submit2();
            }
        }
    }

    // Función para enviar petición a firebase {Este no esta en funcionamiento}
    const submit2=()=>{
        if(userInfo.phoneNumber===newName){
            updateError1(true);
        }else{
            firebase.auth().currentUser.updateProfile(
                {phoneNumber:1234567891}
            ).then(()=>{
                cancelar();
                loadFalse();
            }).catch(()=>{
                updateError1(true);
                loadFalse();
            })
        }
    }

    // Función para enviar petición a firebase y cambiar nombre
    const submit=()=>{
        if(userInfo.displayName===newName){
            updateError1(true);
        }else{
            firebase.auth().currentUser.updateProfile(
                {displayName:newName}
            ).then(()=>{
                cancelar();
                loadFalse();
            }).catch(()=>{
                updateError1(true);
                loadFalse();
            })
        }
    }

    // Retornamos el componente View
    return (
        <View style={styles.view}>
            <Input 
                placeholder="Ingrese nombre"
                onChange={(e)=>changeName(e)}
                errorStyle={error1 ? { color: 'red' } : null}
                errorMessage={error1 ? "Error, cheque si el nombre es valido" : null}
            />
            <View style={styles.viewBtn}>
                <Button
                    title="Cambiar"
                    buttonStyle={styles.btn}
                    onPress={()=>validateN()}
                />
                <Button
                    title="Cancelar"
                    buttonStyle={styles.btnCancelar}
                    onPress={()=>cancelar()}
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
    }
})