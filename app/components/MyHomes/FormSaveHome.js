import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button, BottomSheet, ListItem  } from "react-native-elements";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";
import Modal from "../Modal";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;

export default function FormSaveHome(props) {

    const { toastRef, setIsLoading, navigation } = props;

    const [title, setTitulo] = useState("");
    const [costo, setCosto] = useState("");
    const [cuartos, setCuartos] = useState("");
    const [baños, setBaños] = useState("");
    const [rentaVenta, setRentaOVenta] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [telContacto, setTelContacto] = useState("");

    const [imagesSelected, setImagesSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationHomeAddress, setLocationHomeAddress] = useState(null);
    const [locationHome, setLocationHome] = useState(null);

    const addHome = () => {
        if (!title || !locationHomeAddress || !descripcion) {
            toastRef.current.show("Todos los campos del formulario son obligatorios");
        } else if (size(imagesSelected) === 0) {
            toastRef.current.show("El restaurante tiene que tener almenos una foto");
        } else if (!locationHome) {
            toastRef.current.show("Tienes que localizar el restaurnate en el mapa");
        } else {
            setIsLoading(true);
            uploadImageStorage().then((response) => {
                db.collection("homes")
                    .add({
                        title: title,
                        address: locationHomeAddress,
                        cost: costo,
                        status: rentaVenta,
                        tel: telContacto,
                        rooms: cuartos,
                        bathrooms: baños,
                        description: descripcion,
                        location: locationHome,
                        images: response,
                        rating: 0,
                        ratingTotal: 0,
                        quantityVoting: 0,
                        createAt: new Date(),
                        createBy: firebase.auth().currentUser.uid,
                    })
                    .then(() => {
                        setIsLoading(false);
                        navigation.navigate("myHomes");
                    })
                    .catch(() => {
                        setIsLoading(false);
                        toastRef.current.show(
                            "Error al subir el restaurante, intentelo más tarde"
                        );
                    });
            });
        }
    };

    const uploadImageStorage = async () => {
        const imageBlob = [];

        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await fetch(image);
                const blob = await response.blob();
                const ref = firebase.storage().ref("homes").child(uuid());
                await ref.put(blob).then(async (result) => {
                    await firebase
                        .storage()
                        .ref(`homes/${result.metadata.name}`)
                        .getDownloadURL()
                        .then((photoUrl) => {
                            imageBlob.push(photoUrl);
                        });
                });
            })
        );

        return imageBlob;
    };

    return (
        <ScrollView style={styles.scrollView}>
            <ImageHome imagenHome={imagesSelected[0]} />
            <FormAdd
                setTitulo={setTitulo}
                setCosto={setCosto}
                setCuartos={setCuartos}
                setBaños={setBaños}
                setRentaOVenta={setRentaOVenta}
                setDescripcion={setDescripcion}
                setTelContacto={setTelContacto}
                locationHome={locationHome}
                setIsVisibleMap={setIsVisibleMap}
                setLocationHomeAddress={setLocationHomeAddress}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Guardar Casa"
                onPress={addHome}
                buttonStyle={styles.btnAddRestaurant}
            />
            <Map
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationHome={setLocationHome}
                toastRef={toastRef}
            />
        </ScrollView>
    );
}

function ImageHome(props) {
    const { imagenHome } = props;

    return (
        <View style={styles.viewPhoto}>
            <Image
                source={
                    imagenHome
                        ? { uri: imagenHome }
                        : null
                }
                style={{ width: widthScreen, height: 200 }}
            />
        </View>
    );
}

function FormAdd(props) {
    const {
        setIsVisibleMap,
        locationHome,
    } = props;

    const {
        setTitulo,
        setCosto,
        setCuartos,
        setBaños,
        setRentaOVenta,
        setDescripcion,
        setTelContacto,
        setLocationHomeAddress
    } = props;

    const [rentaVenta, setRentaVenta] = useState(false);
    const [infoButton, setInfoButton] = useState("Seleccionar para poner renta o venta");
    const list = [
        {
            title: 'Renta',
            containerStyle: { backgroundColor: '#2471A3' },
            titleStyle: { color: 'white' },
            onPress: () => { setRentaOVenta("Renta"), setRentaVenta(false), setInfoButton("Renta") },
        },
        {
            title: 'Venta',
            containerStyle: { backgroundColor: '#2471A3' },
            titleStyle: { color: 'white' },
            onPress: () => { setRentaOVenta("Venta"), setRentaVenta(false), setInfoButton("Venta") },
        },
        {
            title: 'Cancelar',
            containerStyle: { backgroundColor: '#A93226' },
            titleStyle: { color: 'white' },
            onPress: () => setRentaVenta(false),
        },
    ];

    const changeTitle = (e) => {
        setTitulo(e.nativeEvent.text);
    }

    const changeCost = (e) => {
        setCosto(e.nativeEvent.text);
    }

    const changeCuartos = (e) => {
        setCuartos(e.nativeEvent.text);
    }

    const changeBaños = (e) => {
        setBaños(e.nativeEvent.text);
    }

    const changeDescripcion = (e) => {
        setDescripcion(e.nativeEvent.text);
    }

    const changeTel = (e) => {
        setTelContacto(e.nativeEvent.text);
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Titulo"
                containerStyle={styles.separar}
                onChange={(e) => changeTitle(e)}
            />
            <View style={styles.rowInput}>
                <Input
                    placeholder="Costo"
                    containerStyle={styles.inputSmall}
                    onChange={(e) => changeCost(e)}
                />
                <Input
                    placeholder="Cuartos"
                    containerStyle={styles.inputSmall}
                    onChange={(e) => changeCuartos(e)}
                />
                <Input
                    placeholder="Baños"
                    containerStyle={styles.inputSmall}
                    onChange={(e) => changeBaños(e)}
                />
            </View>
            <View style={styles.viewBtn}>
                <Button
                    title={infoButton}
                    onPress={() => setRentaVenta(true)}
                    style={styles.btn}
                    containerStyle={styles.separar}
                />
                <BottomSheet isVisible={rentaVenta}>
                    {list.map((l, i) => (
                        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                            <ListItem.Content>
                                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </BottomSheet>
            </View>
            <Input
                placeholder="Descripción"
                multiline={true}
                containerStyle={styles.separar}
                inputContainerStyle={styles.textArea}
                onChange={(e) => changeDescripcion(e)}
            />
            <Input
                placeholder="Tel contacto"
                containerStyle={styles.separar}
                onChange={(e) => changeTel(e)}
            />
            <Input
                placeholder="Dirección"
                containerStyle={styles.input}
                onChange={(e) => setLocationHomeAddress(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationHome ? "#00a680" : "#c2c2c2",
                    onPress: () => {setIsVisibleMap(true)},
                }}
            />

        </View>
    );
}

function Map(props) {
    const {
        isVisibleMap,
        setIsVisibleMap,
        setLocationHome,
        toastRef,
    } = props;
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            );
            const statusPermissions = resultPermissions.permissions.location.status;

            if (statusPermissions !== "granted") {
                toastRef.current.show(
                    "Tienes que aceptar los permisos de localizacion para crear un restaurante",
                    3000
                );
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                });
            }
        })();
    }, []);

    const confirmLocation = () => {
        setLocationHome(location);
        toastRef.current.show("Localizacion guardada correctamente");
        setIsVisibleMap(false);
    };

    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar Ubicacion"
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={confirmLocation}
                    />
                    <Button
                        title="Cancelar Ubicacion"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    );
}

function UploadImage(props) {
    const { toastRef, imagesSelected, setImagesSelected } = props;

    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        if (resultPermissions === "denied") {
            toastRef.current.show(
                "Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir ha ajustes y activarlos manualmente.",
                3000
            );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (result.cancelled) {
                toastRef.current.show(
                    "Has cerrado la galeria sin seleccionar ninguna imagen",
                    2000
                );
            } else {
                setImagesSelected([...imagesSelected, result.uri]);
            }
        }
    };

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro de que quieres eliminar la imagen?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        );
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.viewImages}>
            {size(imagesSelected) < 4 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}
            {map(imagesSelected, (imageRestaurant, index) => (
                <Avatar
                    key={index}
                    style={styles.miniatureStyle}
                    source={{ uri: imageRestaurant }}
                    onPress={() => removeImage(imageRestaurant)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    btnAddRestaurant: {
        backgroundColor: "#2471A3",
        margin: 20,
    },
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
    },
    mapStyle: {
        width: "100%",
        height: 550,
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5,
    },
    viewMapBtnCancel: {
        backgroundColor: "#2471A3",
    },
    viewMapBtnContainerSave: {
        paddingRight: 5,
    },
    viewMapBtnSave: {
        backgroundColor: "#2471A3",
    },
    inputSmall: {
        width: "33.3%"
    },
    rowInput: {
        flexDirection: "row"
    },
});


