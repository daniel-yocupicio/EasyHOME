/*
    ListHomes.js

    Componente que integra en una lista todas las casas que tiene una cuenta.
*/

// Módulos npm
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Image, Icon } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from 'react-native-swipe-list-view';

import 'firebase/firestore';
import firebase from 'firebase/app';
import { firebaseApp } from "../../utils/firebase";
import { set } from "react-native-reanimated";

// objeto de firebase configurado con firebaseApp
const db = firebase.firestore(firebaseApp);

// Función ListHomes
export default function ListHomes(props) {

    //
    const [deleteFav, setDeleteFav] = useState(false);

    // Destructuring de props
    const { homes, setVisible, finishLoad } = props;

    // Objeto navigation para navegar
    const navigation = useNavigation();

    //Función para eliminar un dato
    const deleteData = (key) => {

        setVisible(true);
        setDeleteFav(true);

        db.collection("favorites")
            .where("idHome", "==", key.item.id)
            .get()
            .then((response) => {
                response.forEach((doc) => {

                    db.collection("favorites").doc(doc.id).delete().then(function () {
                        
                    }).catch(function (error) {
                        setVisible(false);
                        setDeleteFav(true);
                    });

                });
            });

        if (!deleteFav) {
            db.collection("homes").doc(key.item.id).delete().then(function () {
                var i = homes.indexOf(key);
                homes.splice(i-1, 1);
                setVisible(false);
                setDeleteFav(false);
            }).catch(function (error) {
                setVisible(false);
                setDeleteFav(false);
            });
        } else {
            setDeleteFav(false);
        }

    }

    function NotFoundHomes() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: "20%" }}>
                
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    No tienes casas registradas
                </Text>

            </View>
        );
    }

    // Función para navegar a otra vista
    const goEdit = (data) => {
        navigation.navigate("homeEdit", {
            data
        });
    };

    // Retornamos View
    return (
        <View>
            {size(homes) > 0 ? (

                <SwipeListView
                    data={homes}
                    renderItem={(home) => (
                        <View key={home.item.id} style={styles.rowFront}>
                            <Home key={home.item.id}  home={home} navigation={navigation} />
                        </View>
                    )}
                    renderHiddenItem={(home) => (
                        <View style={styles.botones}>
                            <Icon
                                reverse
                                type="material-community"
                                name="circle-edit-outline"
                                color="#2471A3"
                                containerStyle={styles.btnContainer}
                                size={30}
                                onPress={(a) => goEdit(home.item)}
                            />
                            <Icon
                                reverse
                                type="material-community"
                                name="delete-circle"
                                color="#D23B2C"
                                containerStyle={styles.btnContainer}
                                size={30}
                                onPress={(a) => deleteData(home)}
                            />
                        </View>
                    )}
                    rightOpenValue={-150}
                />
            ) :

                finishLoad ?
                    <NotFoundHomes />
                    :
                    (
                        <View style={styles.loaderHomes}>
                            <ActivityIndicator size="large" />
                            <Text>Cargando casas</Text>
                        </View>
                    )}
        </View>
    );
}

// Componente Home, este muestra una casa solamente
function Home(props) {

    // Destructuring de props
    const { home, navigation } = props;

    // Destructuring de home
    const { id, images, title, address, cost, status } = home.item;

    // Primer imagen de la casa
    const imageHome = images ? images[0] : null;

    // Función para navegar a otra vista
    const goHome = () => {
        navigation.navigate("home", {
            id,
            title,
        });
    };

    // Retornamos un TouchableOpacity
    return (
        <TouchableOpacity onPress={goHome}
            activeOpacity={1}
        >
            <View style={styles.viewHome}>
                <View style={styles.viewHometImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                        source={
                            imageHome
                                ? { uri: imageHome }
                                : null
                        }
                        style={styles.imageHome}
                    />
                </View>
                <View>
                    <Text style={styles.homeName}>{title}</Text>
                    <Text style={styles.homeAddress}>Dirección: {address}</Text>
                    <Text style={styles.homeAddress}>En {status}</Text>
                    <Text style={styles.homeAddress}>Costo: {cost}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// Componente FooterList
function FooterList(props) {

    //Destructuring de props
    const { setVisible } = props;

    //Si es visible retornamos ActivityIndicador de lo contrario el texto de no hay casas por
    //mostrar
    if (setVisible) {
        return (
            <View style={styles.loaderHomes}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <View style={styles.notFoundHomes}>
                <Text>No quedan Casas por cargar</Text>
            </View>
        );
    }
}

// Objeto de estilos
const styles = StyleSheet.create({
    loaderHomes: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    viewHome: {
        flexDirection: "row",
        margin: 10,
        backgroundColor: "#F3F3F3"
    },
    viewHomeImage: {
        marginRight: 15,
    },
    imageHome: {
        width: 80,
        height: 80,
    },
    homeName: {
        fontWeight: "bold",
        marginLeft: 5
    },
    homeAddress: {
        paddingTop: 2,
        color: "grey",
        marginLeft: 5
    },
    homeDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300,
    },
    notFoundHomes: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
    },
    btnBorrar: {
        backgroundColor: "#D23B2C",
    },
    botones: {
        marginLeft: "55%",
        marginTop: "4.5%",
        flexDirection: "row"
    }
});