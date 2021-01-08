import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";
import { firebaseApp } from "../utils/firebase";

const fireSQL = new FireSQL(firebase.firestore(firebaseApp), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM homes WHERE title LIKE '${search}%'`)
        .then((response) => {
          setHomes(response);
        });
    }
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="Busca tu casa..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
        inputStyle={styles.input}
        lightTheme
      />
      {homes.length === 0 ? (
        <NoFoundHomes />
      ) : (
        <FlatList
          data={homes}
          renderItem={(home) => (
            <Home home={home} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function NoFoundHomes() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/img/no-result-found.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

function Home(props) {
  const { home , navigation } = props;
  const { id, title, images } = home.item;

  return (
    <ListItem
      title={title}
      leftAvatar={{
        source: images[0]
          ? { uri: images[0] }
          : require("../../assets/img/no-image.png"),
      }}
      rightIcon={<Icon type="material-community" name="chevron-right" />}
      onPress={() =>
        navigation.navigate("homeSearch", {
          id,
          title
        })
      }
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
  input: {
      
  }
});