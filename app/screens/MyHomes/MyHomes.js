import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import * as firebase from 'firebase';
import Bloqueado from '../Bloqueado.js';
import Loading from '../../components/Loading';

export default function MyHomes(){

    const [login, setLogin] = useState(null);

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) =>{
            !user? setLogin(false) : setLogin(true)
        });
    },[]);

    return(
            login === null ? <Loading isVisible={true} text="cargando..." /> 
                    :
                    login ? null : <Bloqueado msg="Para ver tus casas es necesario ingresar a tu cuenta." />
    );
}