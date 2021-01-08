/*
    MyHomes.js

    Vista de mis casas la cual muestra las casas que el usuario ingresa, tiene un boton para 
    agregar una nueva casa
*/

// Módulos npm
import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { firebaseApp } from "../../utils/firebase";
import { useFocusEffect } from "@react-navigation/native";
import 'firebase/firestore';
import firebase from 'firebase/app';

// Componentes 
import Bloqueado from '../Bloqueado.js';
import Loading from '../../components/Loading';
import Boton from '../../components/MyHomes/Boton';
import ListaHomes from '../../components/MyHomes/ListHomes';

// objeto de firebase configurado con firebaseApp
const db = firebase.firestore(firebaseApp);

// Función MyHomes
export default function MyHomes() {

    // Hooks de useState para almacenar los datos
    const [login, setLogin] = useState(null);
    const [visible, setVisible] = useState(true);
    const [homes, setHomes] = useState([]);
    const [finishLoad, setFinish]= useState(false);

    firebase.auth().onAuthStateChanged(user => {
        user ? setLogin(true) : setLogin(false);
    });

    useFocusEffect(
        useCallback(() => {
            setFinish(false);
            if (login) {
                setVisible(true);
                setHomes([]);
                const userLocal = firebase.auth().currentUser.uid;

                const resultHomes = [];

                db.collection("homes")
                    .where("createBy", "==", userLocal)
                    .get()
                    .then((response) => {
                        response.forEach((doc) => {
                            const home = doc.data();
                            home.id = doc.id;
                            resultHomes.push(home);
                        });
                        setHomes(resultHomes);
                        setFinish(true);
                    });

                setVisible(false);
            } else {
                setVisible(false);
                setFinish(true);
            }

        }, [login])
    )

    // Retornamos el componente View
    return (
        <View>
            {login ?
                <ListaHomes
                    homes={homes}
                    setVisible={setVisible}
                    finishLoad={finishLoad}
                />
                : null}
            <Loading isVisible={visible} />
            {login ?
                <Boton />
                : <Bloqueado msg="Para ver tus casas es necesario ingresar a tu cuenta." />}
        </View>
    );
}