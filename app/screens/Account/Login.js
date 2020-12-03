import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginForm from '../../components/LoginForm'

export default function Login() {

    const navigation = useNavigation();

    return (
        <ScrollView
            centerContent={true}
        >
            <View style={styles.viewForm}>
            <LoginForm 
                CreateAccount={()=>CreateAccount()}
            />
            </View>

        </ScrollView>
    );
}

function CreateAccount() {

    const navigation = useNavigation();

    return (
        <Text
            style={styles.textregister}
        >
            ¿Aún no tienes una cuenta?{" "}

            <Text 
                style={styles.btnRegister}
                onPress={()=>navigation.navigate("register")}
            >
                Registrate!
            </Text>

        </Text>
    );
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
    viewForm: {
        marginLeft: 25,
        marginRight: 25,
        marginTop: 20
    }
});