/*
    MyHomes.js

    Vista de mis casas la cual muestra las casas que el usuario ingresa, tiene un boton para 
    agregar una nueva casa

    No funciona aun en la parte de filtrado para que salgan las casas de esa cuenta... SUPER F

*/

// Módulos npm
import React, { useState, useEffect, useCallback } from 'react';
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
    const [totalHomes, setTotalHomes] = useState(0);
    const [startHomes, setStartHomes] = useState(null);
    const limitHomes = 10;

    firebase.auth().onAuthStateChanged(user => {
        user ? setLogin(true) : setLogin(false);
    });

    useFocusEffect(
        useCallback(() => {

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
                    });
                setVisible(false);
            } else {
                setVisible(false);
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
                />
                : null}
            <Loading isVisible={visible} />
            {login ?
                <Boton />
                : <Bloqueado msg="Para ver tus casas es necesario ingresar a tu cuenta." />}
        </View>
    );
}