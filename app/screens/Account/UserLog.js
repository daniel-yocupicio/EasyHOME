import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import Loadin from '../../components/Loading';
import InfoUser from '../../components/Account/InfoUser';
import FormUser from '../../components/Account/FormUser';


export default function UserLog() {

    const [userInfo, updateUser]=useState(null);
    const [load, updateLoad] = useState(false);

    useEffect(()=>{
        loadTrue();
        (async ()=>{
            const user = await firebase.auth().currentUser;
            updateUser(user);
        })();
        loadFalse();
    },[]);

    const loadTrue=()=>{
        updateLoad(true);
    }

    const loadFalse=()=>{
        updateLoad(false);
    }

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