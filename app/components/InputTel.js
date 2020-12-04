import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

export default function InputTel(props) {

    const {cancelar2, userInfo, loadFalse, loadTrue}=props;

    const [newTel, updateTel] = useState("");

    const changeTel=(e)=>{
       updateTel(e.nativeEvent.text);
        console.log(newTel);
    }

    const validateT=()=>{
        loadTrue();
        if(newTel===""){
            //No puedo meter nombres sin nada
            loadFalse()
        }else{
            submit();
        }
    }

    const submit=()=>{
        if(userInfo.phoneNumber===newTel){
            //No se pueden repetir nombres alv
        }else{
            firebase.auth().currentUser.updateProfile(
                {phoneNumber:newTel}
            ).then(()=>{
                cancelar2();
                console.log("ok");
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
                onChange={(e)=>changeTel(e)}
            />
            <View style={styles.viewBtn}>
                <Button
                    title="Cambiar"
                    buttonStyle={styles.btn}
                    onPress={()=>validateT()}
                />
                <Button
                    title="Cancelar"
                    buttonStyle={styles.btnCancelar}
                    onPress={()=>cancelar2()}
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