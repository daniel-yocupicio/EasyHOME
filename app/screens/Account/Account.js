/*
    Account.js

    Vista de cuenta, en este archivo se implementan componentes UserGuest, UserLog y Loading.
*/

// Módulos de npm
import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';

// Componentes utilizados en esta vista
import UserGuest from '../../components/Account/UserGuest';
import UserLog from '../../components/Account/UserLog';
import Loading from '../../components/Loading';

// Funcion Account
export default function Account(){

    // useState con el valor login
    const [login, setLogin] = useState(null);

    // useEffect para saber si hay cuenta logueada o no
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) =>{
            !user? setLogin(false) : setLogin(true)
        });
    },[]);

    // Retornamos UserLog o UserGuest
    return(
        login === null ? <Loading isVisible={true} text="cargando..." /> 
                :
                login ? <UserLog/> : <UserGuest/>
    );
}