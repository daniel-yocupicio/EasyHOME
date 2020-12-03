import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import * as firebase from 'firebase';

export default function UserLog(){
    return(
        <View style={styles.view}>
            <Button 
                title="Cerrar sesión"
                onPress={()=>firebase.auth().signOut()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        marginTop: 20,
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    btn: {
        marginTop: 40
    },
    btnregister: {
        backgroundColor: "#2471A3"
    },
    icon: {
        marginRight: "10%"
    },
    view2: {
        marginTop: 20
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