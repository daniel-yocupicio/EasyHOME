import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Boton() {

    const navigation=useNavigation();

    return (
            <Icon
                reverse
                type="material-community"
                name="plus"
                color="#2471A3"
                containerStyle={styles.btnContainer}
                onPress={()=>navigation.navigate("savehome")}
            />
    );
}

const styles = StyleSheet.create({
    viewBody: {
        backgroundColor: "#fff",
    },
    btnContainer:{
        position: "absolute",
        right: 10,
        shadowColor: "black",
        top: (Dimensions.get('window').height) - (Dimensions.get('window').height / 3.3),
    }
})