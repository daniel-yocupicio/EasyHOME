import React, {useState} from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import InputName from './InputName';
import InputTel from './InputTel';

export default function FormUser(props) {

    const [input, updateInput] = useState(false);
    const [input2, updateInput2] = useState(false);

    const {userInfo, loadTrue, loadFalse} = props;

    const updateFoto=()=>{
        firebase.storage().ref(`avatar/${userInfo.uid}`).getDownloadURL().then( async result => {
            const update = {
                photoURL: result
            };
            await firebase.auth().currentUser.updateProfile(update);
            loadFalse();
        }).catch(()=>{
            //Error
        });
    }

    const uploadImage = async (uri)=>{
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref(`avatar/${userInfo.uid}`);
        return ref.put(blob).then(()=>{
            updateFoto();   
        }).catch(()=>{
            loadFalse();
        });
    }

    const cancelarName=()=>{
        updateInput(false);
    }

    const cancelarTel=()=>{
        updateInput2(false);
    }

    const changeAvatar = async () =>{
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if(resultPermissionCamera === "denied"){
            //toastRef.current.show("Es necesario aceptar los permisos de la galeria.");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3],
            });

            if(result.cancelled){
                //toastRef.current.show("Se cancelo la galeria.");
            } else {
                loadTrue();
                uploadImage(result.uri);
            }

        }
    }

    return (
        <View>
            <View style={styles.viewUserInfo}>
                <Icon type="material-community" name="pencil" size={30} color="#2471A3" />
                <Text style={styles.text}>Editar información personal</Text>
            </View>
            <View style={styles.viewUserInfo2}>
                <Text style={styles.textCButton}>Nuevo nombre</Text>
                <Button
                    title=""
                    icon={
                        <Icon
                            type="material-community"
                            name="circle-edit-outline"
                            size={25}
                            color="white"
                        />
                    }
                    onPress={(b)=>updateInput(true)}
                />
            </View>
            {input ? <InputName 
                        cancelar={()=>cancelarName()}
                        userInfo={userInfo}
                        loadTrue={()=>loadTrue()}
                        loadFalse={()=>loadFalse()}
            /> : null}    
            <View style={styles.viewUserInfo2}>
                <Text style={styles.textCButton}>Seleccionar nueva imagen</Text>
                <Button
                    title=""
                    icon={
                        <Icon
                            type="material-community"
                            name="image-plus"
                            size={25}
                            color="white"
                        />
                    }
                    onPress={()=>changeAvatar()}
                />
            </View>
            <View style={styles.viewUserInfo2}>
                <Text style={styles.textCButton}>Nuevo telefono</Text>
                <Button
                    title=""
                    icon={
                        <Icon
                            type="material-community"
                            name="circle-edit-outline"
                            size={25}
                            color="white"
                        />
                    }
                    onPress={(b)=>updateInput2(true)}
                />
            </View>
            {input2 ? <InputTel 
                        cancelar2={()=>cancelarTel()}
                        userInfo={userInfo}
                        loadTrue={()=>loadTrue()}
                        loadFalse={()=>loadFalse()}
            /> : null} 
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
    },
    text: {
        fontSize: 20,
        color: "#2471A3"
    },
    textCButton: {
        fontSize: 13,
        color: "#000",
        marginRight: 20
    },
    viewUserInfo2: {
        flexDirection: "row",
        paddingTop: 2,
        paddingBottom: 2,
        marginLeft: 10,
        alignItems: "center",
        marginRight: 10
    },
    inputContainer: {
        width: "80%",
        marginRight: 10
    },
    label: {
        fontSize: 13,
        marginBottom: -20,
        width: "80%"
    },
    icon: {
        marginLeft: 10
    }


});