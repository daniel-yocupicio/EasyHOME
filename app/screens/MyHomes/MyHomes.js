import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import Bloqueado from '../Bloqueado.js';
import Loading from '../../components/Loading';
import Boton from '../../components/MyHomes/Boton';
import { firebaseApp } from "../../utils/firebase";
import firebase from 'firebase/app';
import ListaHomes from '../../components/MyHomes/ListHomes';
import { useFocusEffect } from "@react-navigation/native";
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

export default function MyHomes() {

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