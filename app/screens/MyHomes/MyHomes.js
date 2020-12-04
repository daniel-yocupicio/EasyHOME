import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Bloqueado from '../Bloqueado.js';
import Loading from '../../components/Loading';
import Boton from '../../components/MyHomes/Boton';
import { firebaseApp } from "../../utils/firebase";
import  firebase  from 'firebase/app';

export default function MyHomes() {

    const [login, setLogin] = useState(null);
    const [visible, setVisible] = useState(true);
    const [user, setUser]= useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            user ? setUser(user) : null ;
            !user ? setLogin(false) : setLogin(true);
            setVisible(false);
        });
    }, []);

    return (
        <View>
            {login ? <Text>tRUE</Text> : null}
            <Loading isVisible={visible} />
            {login ? 
            <Boton /> 
            : <Bloqueado msg="Para ver tus casas es necesario ingresar a tu cuenta." />}
        </View>
    );
}