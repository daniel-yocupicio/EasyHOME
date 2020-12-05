import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button, Divider, BottomSheet, ListItem } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { map } from 'lodash';

export default function FormSaveHome(props) {
    const { toastRef, navigation, setIsLoading } = props;
    const [home, setHome] = useState(null);
    const [title, setTitulo] = useState("");
    const [costo, setCosto] = useState("");
    const [cuartos, setCuartos] = useState("");
    const [baños, setBaños] = useState("");
    const [rentaVenta, setRentaOVenta] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [telContacto, setTelContacto] = useState("");
    const [direccion, setDireccion] = useState("");
    const [imageSelected, setImageSelected] = useState([]);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.row}>
                <View style={styles.logo}>
                    <Icon type="material-community" name="shield-home" size={90} color="#2471A3" />
                    <Text style={styles.text}>EasyHome</Text>
                </View>
                <Text style={styles.textTitle}>Guardar Casa</Text>
            </View>
            <Divider style={styles.divider} />
            <FormAdd
                setTitulo={setTitulo}
                setCosto={setCosto}
                setCuartos={setCuartos}
                setBaños={setBaños}
                setRentaOVenta={setRentaOVenta}
                setDescripcion={setDescripcion}
                setTelContacto={setTelContacto}
                setDireccion={setDireccion}

            />
            <UploadImage
                toastRef={toastRef}
                setImageSelected={setImageSelected}
                imageSelected={imageSelected}
            />
            <Button
                title="Guardar Casa"
                onPress={() => console.log(title, costo)}
                buttonStyle={styles.btnStyle}
            />
        </ScrollView>
    );
}

function FormAdd(props) {
    const { setTitulo, setCosto, setCuartos, setBaños, setRentaOVenta, setDescripcion, setTelContacto, setDireccion } = props;
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

    const changeDireccion = (e) => {
        setDireccion(e.nativeEvent.text);
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
                containerStyle={styles.separar}
                onChange={(e) => changeDireccion(e)}
            />
        </View>
    );
}

function UploadImage(props) {

    const { toastRef, setImageSelected, imageSelected } = props;

    const imageSelect = async () => {
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        if (resultPermission === "denied") {
            toastRef.current.show("Problemas con los permisos", 3000);
        } else {
            const result = await ImagePicker.launchImageLibraryAsync(
                {
                    allowsEditing: true,
                    aspect: [4, 3]
                }
            );
            if (result.cancelled) {
                toastRef.current.show("Cerraste la galeria sin seleccionar una imagen", 3000);
            } else {
                setImageSelected([...imageSelected, result.uri]);
                toastRef.current.show("Cerraste la galeria sin seleccionar una imagen", 3000);
                console.log(imageSelected);
            }
        }
    }

    return (
        <View style={styles.images}>
            <Icon type="material-community" name="camera" color="#2471A3" style={styles.icon}
                onPress={() => imageSelect()}
            />
            {map(imageSelected, (imagesHome) => {
                <Icon type="material-community" name="camera" color="#2471A3"/>
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {

    },
    scrollView: {
        height: "100%",
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15
    },
    text: {
        color: "#2471A3",
        marginTop: -5,
        fontSize: 20,
    },
    logo: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    textTitle: {
        color: "#2471A3",
        marginTop: -5,
        fontSize: 35,
    },
    row: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    divider: {
        backgroundColor: "#85C1E9",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15
    },
    rowInput: {
        flexDirection: "row"
    },
    inputSmall: {
        width: "33.3%"
    },
    select: {
        width: "70%"
    },
    btn: {
        backgroundColor: "#2471A3",
    },
    viewBtn: {
        marginLeft: 10,
        marginRight: 10
    },
    separar: {
        marginBottom: 5
    },
    textArea: {
        height: 120,
        width: "100%"
    },
    btnStyle: {
        backgroundColor: "#2471A3",
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20

    },
    images: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        width: 70
    }
})