import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Rating, ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import Loading from "../components/Loading";
import Carousel from "../components/Carousel";
import Map from "../components/Map";
import ListReviews from "../components/ListReviews";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Home(props) {
  const { navigation, route } = props;
  const { id, title } = route.params;
  const [home, setHome] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  navigation.setOptions({ title: title });

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      db.collection("homes")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setHome(data);
          setRating(data.rating);
        });
    }, [])
  );

  useEffect(() => {
    if (userLogged && home) {
      db.collection("favorites")
        .where("idHome", "==", home.id)
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then((response) => {
          if (response.docs.length === 1) {
            setIsFavorite(true);
          }
        });
    }
  }, [userLogged, home]);

  const addFavorite = () => {
    if (!userLogged) {
      toastRef.current.show(
        "Para usar el sistema de favoritos tienes que estar logeado"
      );
    } else {
      const payload = {
        idUser: firebase.auth().currentUser.uid,
        idHome: home.id,
      };
      db.collection("favorites")
        .add(payload)
        .then(() => {
          setIsFavorite(true);
          toastRef.current.show("Casa añadida a favoritos");
        })
        .catch(() => {
          toastRef.current.show("Error al añadir la casa a favoritos");
        });
    }
  };

  const removeFavorite = () => {
    db.collection("favorites")
      .where("idHome", "==", home.id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsFavorite(false);
              toastRef.current.show("Casa eliminada de favoritos");
            })
            .catch(() => {
              toastRef.current.show(
                "Error al eliminar la casa de favoritos"
              );
            });
        });
      });
  };

  if (!home) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView vertical style={styles.viewBody}>
      <View style={styles.viewFavorite}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          underlayColor="transparent"
        />
      </View>
      <Carousel
        arrayImages={home.images}
        height={250}
        width={screenWidth}
      />
      <TitleHome
        name={home.title}
        description={home.description}
        rating={rating}
      />
      <HomeInfo
        location={home.location}
        name={home.title}
        address={home.address}
        tel={home.tel}
        cost={home.cost}
        status={home.status}
        bathrooms={home.bathrooms}
        rooms={home.rooms}
      />
      <ListReviews navigation={navigation} idHome={home.id} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function TitleHome(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewHomeTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameHome}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionHome}>{description}</Text>
    </View>
  );
}

function HomeInfo(props) {
  const { location, name, address, tel, cost, status, bathrooms, rooms } = props;

  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null,
    },
    {
      text: tel,
      iconName: "phone",
      iconType: "material-community",
      action: null,
    },
    {
      text: cost,
      iconName: "currency-usd",
      iconType: "material-community",
      action: null,
    },
    {
      text: "En "+status,
      iconName: "bookmark-check",
      iconType: "material-community",
      action: null,
    },
    {
      text: "Número de baños "+bathrooms,
      iconName: "thumb-up-outline",
      iconType: "material-community",
      action: null,
    },
    {
      text: "Número de cuartos "+rooms,
      iconName: "thumb-up-outline",
      iconType: "material-community",
      action: null,
    },
  ];

  return (
    <View style={styles.viewHomeInfo}>
      <Text style={styles.homeInfoTitle}>
        Información sobre la casa
      </Text>
      <Map location={location} name={name} height={100} />

      {map(listInfo, (item, index) => (

        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#00a680",
          }}
          containerStyle={styles.containerListItem}
        />

      ))}


    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewHomeTitle: {
    padding: 15,
  },
  nameHome: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionHome: {
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  viewHomeInfo: {
    margin: 15,
    marginTop: 25,
  },
  homeInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15,
  },
});