import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";
import Bloqueado from "../Bloqueado";

const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
  const { navigation } = props;
  const [homes, setHomes] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      if (userLogged) {
        const idUser = firebase.auth().currentUser.uid;
        db.collection("favorites")
          .where("idUser", "==", idUser)
          .get()
          .then((response) => {
            const idHomesArray = [];
            response.forEach((doc) => {
              idHomesArray.push(doc.data().idHome);
            });
            getDataHome(idHomesArray).then((response) => {
              const homes = [];
              response.forEach((doc) => {
                const home = doc.data();
                home.id = doc.id;
                homes.push(home);
              });
              setHomes(homes);
            });
          });
      }
      setReloadData(false);
    }, [userLogged, reloadData])
  );

  const getDataHome = (idHomesArray) => {
    const arrayHomes = [];
    idHomesArray.forEach((idHome) => {
      const result = db.collection("homes").doc(idHome).get();
      arrayHomes.push(result);
    });
    return Promise.all(arrayHomes);
  };

  if (!userLogged) {
    return <Bloqueado msg="Para ver tus favoritos es necesario ingresar a tu cuenta."/>;
  }

  if (homes?.length === 0) {
    return <NotFoundHomes />;
  }

  return (
    <View style={styles.viewBody}>
      {homes ? (
        <FlatList
          data={homes}
          renderItem={(home) => (
            <Home
              home={home}
              setIsLoading={setIsLoading}
              toastRef={toastRef}
              setReloadData={setReloadData}
              navigation={navigation}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loaderHomes}>
          <ActivityIndicator size="large" />
          <Text style={{ textAlign: "center" }}>Cargando casas</Text>
        </View>
      )}
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text="Eliminando casa" isVisible={isLoading} />
    </View>
  );
}

function NotFoundHomes() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        No tienes casas en tu lista
      </Text>
    </View>
  );
}

function Home(props) {
  const {
    home,
    setIsLoading,
    toastRef,
    setReloadData,
    navigation,
  } = props;
  const { id, name, images } = home.item;

  const confirmRemoveFavorite = () => {
    Alert.alert(
      "Eliminar casa de Favoritos",
      "¿Estas seguro de que quieres eliminar la casa de favoritos?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: removeFavorite,
        },
      ],
      { cancelable: false }
    );
  };

  const removeFavorite = () => {
    setIsLoading(true);
    db.collection("favorites")
      .where("idHome", "==", id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              toastRef.current.show("Casa eliminada correctamente");
            })
            .catch(() => {
              setIsLoading(false);
              toastRef.current.show("Error al eliminar la casa");
            });
        });
      });
  };

  return (
    <View style={styles.home}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("myHomes", {
            screen: "home",
            params: { id },
          })
        }
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
          source={
            images[0]
              ? { uri: images[0] }
              : require("../../../assets/img/no-image.png")
          }
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            containerStyle={styles.favorite}
            onPress={confirmRemoveFavorite}
            underlayColor="transparent"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  loaderHomes: {
    marginTop: 10,
    marginBottom: 10,
  },
  home: {
    margin: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: -30,
    backgroundColor: "#fff",
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
  },
  favorite: {
    marginTop: -35,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100,
  },
});