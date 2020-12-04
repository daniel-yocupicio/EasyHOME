import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button, Divider, BottomSheet, ListItem } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

export default function FormSaveHome(props) {

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.row}>
                <View style={styles.logo}>
                    <Icon type="material-community" name="shield-home" size={90} color="#2471A3" />
                    <Text style={styles.text}>EasyHome</Text>
                </View>
                <Text style={styles.textTittle}>Guardar Casa</Text>
            </View>
            <Divider style={styles.divider} />
            <FormAdd />
        </ScrollView>
    );
}

function FormAdd(props) {

    const [rentaVenta, setRentaVenta] = useState(false);
    const list = [
        { title: 'Renta' },
        { title: 'Venta' },
        {
            title: 'Cancelar',
            containerStyle: { backgroundColor: '#A93226' },
            titleStyle: { color: 'white' },
            onPress: () => setRentaVenta(false),
        },
    ];

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Titulo"
            />
            <View style={styles.rowInput}>
                <Input
                    placeholder="Costo"
                    containerStyle={styles.inputSmall}
                />
                <Input
                    placeholder="Cuartos"
                    containerStyle={styles.inputSmall}
                />
                <Input
                    placeholder="Baños"
                    containerStyle={styles.inputSmall}
                />
            </View>
            <View>
                <Button 
                    title="Seleccionar para poner renta o venta"
                    onPress={()=>setRentaVenta(true)}
                    style={styles.btn}
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
            />
            <Input
                placeholder="Tel contacto"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {

    },
    scrollView: {
        height: "100%"
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
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
    textTittle: {
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
        width: "30%"
    },
    select: {
        width: "70%"
    },
    btn: {
        backgroundColor: "#2471A3",
        marginLeft: 10,
        marginRight: 10
    }
})