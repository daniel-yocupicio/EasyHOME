/*
    FormSaveHome.js

    Componente del formulario para guardar una casa nueva en firebase

    Warnings:
    Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`
*/

// Módulos npm
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button, BottomSheet, ListItem } from "react-native-elements";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

// Componentes creados
import Modal from "../Modal";

// Objeto db para manejar firestore (firebase)
const db = firebase.firestore(firebaseApp);

// Obtenemos el width de la pantalla
const widthScreen = Dimensions.get("window").width;

// Función FormSaveHome
export default function FormEditHome(props) {

    //Destructuring de props
    const { toastRef, setIsLoading, navigation, data} = props;

    console.log(data)

    // useState para almacenar datos
    const [title, setTitulo] = useState(data.data.title);
    const [costo, setCosto] = useState(data.data.cost);
    const [cuartos, setCuartos] = useState(data.data.rooms);
    const [baños, setBaños] = useState(data.data.bathrooms);
    const [rentaVenta, setRentaOVenta] = useState(data.data.status);
    const [descripcion, setDescripcion] = useState(data.data.description);
    const [telContacto, setTelContacto] = useState(data.data.tel);
    const [imagesSelected, setImagesSelected] = useState(data.data.images);
    const [images, setImages] = useState(data.data.images);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationHomeAddress, setLocationHomeAddress] = useState(data.data.address);
    const [locationHome, setLocationHome] = useState(data.data.location);

    // Función para agregar casa
    const editHome = () => {
        if (!title || !locationHomeAddress || !descripcion || !costo || !cuartos || !baños || !rentaVenta || !telContacto) {
            toastRef.current.show("Todos los campos del formulario son obligatorios");
        } else if (size(imagesSelected) === 0) {
            toastRef.current.show("La casa tiene que tener almenos una foto");
        } else if (!locationHome) {
            toastRef.current.show("Tienes que localizar la casa en el mapa");
        } else {
            setIsLoading(true);
            uploadImageStorage().then((response) => {
                db.collection("homes")
                    .doc(data.data.id)
                    .update({
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
                            "Error al editar la casa, intentelo más tarde"
                        );
                    });
            });
        }
    };

    // Función para subir imagen
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

        // Función para borrar imagen
        const deleteImageStorage = async () => {
            const imageBlob = [];
    
            await Promise.all(
                map(images, async (image) => {
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

    // Retornamos un ScrollView
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
                titulo={title}
                costo={costo}
                cuartos={cuartos}
                baños={baños}
                rentaoVenta={rentaVenta}
                descripcion={descripcion}
                telContacto={telContacto}
                setIsVisibleMap={setIsVisibleMap}
                locationHomeAddress={locationHomeAddress}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Guardar cambios"
                onPress={editHome}
                buttonStyle={styles.btnAddHome}
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

// Componente ImageHome
function ImageHome(props) {

    // Destructuring de props
    const { imagenHome } = props;

    // Retornamos un View
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

// Componente FormAdd
function FormAdd(props) {

    // Destructuring de props para el mapa
    const {
        setIsVisibleMap,
        locationHome,
    } = props;

    // Destructuring de props para los datos de los input
    const {
        setTitulo,
        setCosto,
        setCuartos,
        setBaños,
        setRentaOVenta,
        setDescripcion,
        setTelContacto,
        setLocationHomeAddress,
        titulo,
        costo,
        cuartos,
        baños,
        rentaoVenta,
        descripcion,
        telContacto,
        locationHomeAddress
    } = props;

    console.log(props)

    // useState para almacenar datos
    const [rentaVenta, setRentaVenta] = useState(rentaoVenta);
    const [infoButton, setInfoButton] = useState(rentaoVenta);

    // Lista para un boton desplegable inferior
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

    // Función para cambiar informacion de un useState
    const changeTitle = (e) => {
        setTitulo(e.nativeEvent.text);
    }

    // Función para cambiar informacion de un useState
    const changeCost = (e) => {
        setCosto(e.nativeEvent.text);
    }

    // Función para cambiar informacion de un useState
    const changeCuartos = (e) => {
        setCuartos(e.nativeEvent.text);
    }

    // Función para cambiar informacion de un useState
    const changeBaños = (e) => {
        setBaños(e.nativeEvent.text);
    }

    // Función para cambiar informacion de un useState
    const changeDescripcion = (e) => {
        setDescripcion(e.nativeEvent.text);
    }

    // Función para cambiar informacion de un useState
    const changeTel = (e) => {
        setTelContacto(e.nativeEvent.text);
    }

    // Retornamos un View
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Titulo"
                containerStyle={styles.separar}
                onChange={(e) => changeTitle(e)}
                value={titulo}
            />
            <View style={styles.rowInput}>
                <Input
                    placeholder="Costo"
                    containerStyle={styles.inputSmall}
                    onChange={(e) => changeCost(e)}
                    value={costo}
                />
                <Input
                    placeholder="Cuartos"
                    containerStyle={styles.inputSmall}
                    onChange={(e) => changeCuartos(e)}
                    value={cuartos}
                />
                <Input
                    placeholder="Baños"
                    containerStyle={styles.inputSmall}
                    onChange={(e) => changeBaños(e)}
                    value={baños}
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
                value={descripcion}
            />
            <Input
                placeholder="Tel contacto"
                containerStyle={styles.separar}
                onChange={(e) => changeTel(e)}
                value={telContacto}
            />
            <Input
                placeholder="Dirección"
                containerStyle={styles.input}
                onChange={(e) => setLocationHomeAddress(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationHome ? "#00a680" : "#c2c2c2",
                    onPress: () => { setIsVisibleMap(true) },
                }}
                value={locationHomeAddress}
            />

        </View>
    );
}

// Componente Map
function Map(props) {

    //Destructuring de props
    const {
        isVisibleMap,
        setIsVisibleMap,
        setLocationHome,
        toastRef,
    } = props;

    // useState para almacenar información
    const [location, setLocation] = useState(null);

    // Hook useEffect
    useEffect(() => {
        (async () => {
            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            );
            const statusPermissions = resultPermissions.permissions.location.status;

            if (statusPermissions !== "granted") {
                toastRef.current.show(
                    "Tienes que aceptar los permisos de localizacion para crear una casa",
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

    // Función para confirmar locación
    const confirmLocation = () => {
        setLocationHome(location);
        toastRef.current.show("Localizacion guardada correctamente");
        setIsVisibleMap(false);
    };

    // Retornamos el Modal
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

// Componente UploadImage
function UploadImage(props) {

    //Destructuring de props
    const { toastRef, imagesSelected, setImagesSelected } = props;

    // Función imageSelect
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

    // Función removeImage
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

    // Retornamos un View
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
            {map(imagesSelected, (imageHome, index) => (
                <Avatar
                    key={index}
                    style={styles.miniatureStyle}
                    source={{ uri: imageHome }}
                    onPress={() => removeImage(imageHome)}
                />
            ))}
        </View>
    );
}

// Objeto de estilos
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
    btnAddHome: {
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


