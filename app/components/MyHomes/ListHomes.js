import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListHomes(props) {

    const { homes, setVisible } = props;
    const navigation = useNavigation();

    return (
        <View>
            {size(homes) > 0 ? (
                <FlatList
                    data={homes}
                    renderItem={(home) => (
                        <Home home={home} navigation={navigation} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={<FooterList setVisible={setVisible} />}
                />
            ) : (
                    <View style={styles.loaderHomes}>
                        <ActivityIndicator size="large" />
                        <Text>Cargando casas</Text>
                    </View>
                )}
        </View>
    );
}

function Home(props) {
    const { home, navigation } = props;
    const { id, images, title, address, cost, status } = home.item;
    const imageHome = images ? images[0] : null;

    const goHome = () => {
        navigation.navigate("home", {
            id,
            title,
        });
    };

    return (
        <TouchableOpacity onPress={goHome}>
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

function FooterList(props) {
    const { setVisible } = props;

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

const styles = StyleSheet.create({
    loaderHomes: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    viewHome: {
        flexDirection: "row",
        margin: 10,
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
});