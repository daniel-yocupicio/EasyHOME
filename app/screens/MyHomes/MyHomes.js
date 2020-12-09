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
    const [user, setUser] = useState(null);
    const [homes, setHomes] = useState([]);
    const [totalHomes, setTotalHomes] = useState(0);
    const [startHomes, setStartHomes] = useState(null);
    const limitHomes = 10;


    useFocusEffect(
        useCallback(() => {
            db.collection("homes")
                .get()
                .then((snap) => {
                    setTotalHomes(snap.size);
                });

            const resultHomes = [];

            db.collection("homes")
                .where("uid", "==", "ibCSHJ5vCXbzlY3G0yYv3D6dzES2")
                .orderBy("createAt", "desc")
                .limit(limitHomes)
                .get()
                .then((response) => {
                    setStartHomes(response.docs[response.docs.length - 1]);

                    response.forEach((doc) => {
                        const home = doc.data();
                        home.id = doc.id;
                        resultHomes.push(home);
                    });
                    setHomes(resultHomes);
                });
        }, [])
    )

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            user ? setUser(user) : null;
            !user ? setLogin(false) : setLogin(true);
            setVisible(false);
        });
    }, [])

    const handleLoadMore = () => {
        const resultHomes = [];
        homes.length < totalHomes && setVisible(true);

        db.collection("homes")
            .orderBy("createAt", "desc")
            .startAfter(startHomes.data().createAt)
            .limit(limitHomes)
            .get()
            .then((response) => {
                if (response.docs.length > 0) {
                    setStartHomes(response.docs[response.docs.length - 1]);
                } else {
                    setVisible(false);
                }

                response.forEach((doc) => {
                    const home = doc.data();
                    home.id = doc.id;
                    resultHomes.push(home);
                });

                setHomes([...homes, ...resultHomes]);
            });
    };

    // Retornamos el componente View
    return (
        <View>
            {login ?
                <ListaHomes
                    homes={homes}
                    handleLoadMore={handleLoadMore}
                    setVisible={setVisible}
                />
                : null}
            <Loading isVisible={visible} />
            {login ?
                <Boton user={user} />
                : <Bloqueado msg="Para ver tus casas es necesario ingresar a tu cuenta." />}
        </View>
    );
}