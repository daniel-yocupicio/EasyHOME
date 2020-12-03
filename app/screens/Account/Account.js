import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';
import UserGuest from './UserGuest';
import UserLog from './UserLog';
import Loading from '../../components/Loading';

export default function Account(){

    const [login, setLogin] = useState(null);

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) =>{
            !user? setLogin(false) : setLogin(true)
        });
    },[]);

    return(
        login === null ? <Loading isVisible={true} text="cargando..." /> 
                :
                login ? <UserLog/> : <UserGuest/>
    );
}