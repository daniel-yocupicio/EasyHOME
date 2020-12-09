/*
    UserLog.js

    Componente UserLog donde se muestra la información.
*/

// Módulos npm
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';

// Componentes
import Loadin from '../Loading';
import InfoUser from './InfoUser';
import FormUser from './FormUser';

// Función UserLog
export default function UserLog() {

    // creamos dos constantes useState
    const [userInfo, updateUser]=useState(null);
    const [load, updateLoad] = useState(false);

    // Usamos hooks useEffect para obtener el usuario
    useEffect(()=>{
        loadTrue();
        (async ()=>{
            const user = await firebase.auth().currentUser;
            updateUser(user);
        })();
        loadFalse();
    },[]);

    // Cambiar el load a verdadero
    const loadTrue=()=>{
        updateLoad(true);
    }

    // Cambiar el load a falso
    const loadFalse=()=>{
        updateLoad(false);
    }

    // Retornar el ScrollView
    return (
        <ScrollView style={styles.viewUserInfo}>
            {userInfo != null ? <InfoUser userInfo={userInfo}

            /> : null }
            {userInfo != null ? <FormUser userInfo={userInfo}
                                          loadTrue={()=>loadTrue()}
                                          loadFalse={()=>loadFalse()}
            /> : null }
            <View style={styles.view}>
                <Button
                    title="Cerrar sesión"
                    onPress={() => firebase.auth().signOut()}
                    buttonStyle={styles.btnCloseSesion}
                />
            </View>
            <Loadin isVisible={load} text="Cargando datos..." />
        </ScrollView>
    );
}

// Objeto de estilos
const styles = StyleSheet.create({
    view: {
        marginTop: 20,
        marginBottom: 20
    },
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#EAF2F8"
    },
    btnCloseSesion: {
        backgroundColor: "#2471A3",
        marginLeft: 10,
        marginRight: 10
    }
});