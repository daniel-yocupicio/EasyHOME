import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

export default function InputName(props) {

    const {cancelar, userInfo, loadFalse, loadTrue}=props;

    const [newName, updateName] = useState("");

    const changeName=(e)=>{
       updateName(e.nativeEvent.text);
        console.log(newName);
    }

    const validateN=()=>{
        loadTrue();
        if(newName===""){
            //No puedo meter nombres sin nada
            loadFalse()
        }else{
            submit();
        }
    }

    const submit=()=>{
        if(userInfo.displayName===newName){
            //No se pueden repetir nombres alv
        }else{
            firebase.auth().currentUser.updateProfile(
                {displayName:newName}
            ).then(()=>{
                cancelar();
                console.log("ok");
                loadFalse();
            }).catch(()=>{
                //Hay un error
                console.log("err")
                loadFalse();
            })
        }
    }

    return (
        <View style={styles.view}>
            <Input 
                placeholder="Ingrese nombre"
                onChange={(e)=>changeName(e)}
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