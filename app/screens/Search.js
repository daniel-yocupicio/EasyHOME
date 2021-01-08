import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon, ButtonGroup } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";
import { firebaseApp } from "../utils/firebase";
import ButtonToggleGroup from 'react-native-button-toggle-group';

const fireSQL = new FireSQL(firebase.firestore(firebaseApp), { includeId: "id" });
const db=firebase.firestore(firebaseApp);

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [homes, setHomes] = useState([]);
  const [selectedIndex, updateIndex] = useState("Título");


  useEffect(() => {
    if (search) {
      if(selectedIndex=="Título"){
        fireSQL
        .query(`SELECT * FROM homes WHERE title LIKE '${search}%'`)
        .then((response) => {
          setHomes(response);
        });
      }
      if(selectedIndex=="Costo"){
        fireSQL
        .query(`SELECT * FROM homes WHERE cost LIKE '${search}%'`)
        .then((response) => {
          setHomes(response);
        });
      }
      if(selectedIndex=="Cuartos"){
        fireSQL
        .query(`SELECT * FROM homes WHERE rooms LIKE '${search}%'`)
        .then((response) => {
          setHomes(response);
        });
      }
      if(selectedIndex=="Baños"){
        fireSQL
        .query(`SELECT * FROM homes WHERE bathrooms LIKE '${search}%'`)
        .then((response) => {
          setHomes(response);
        });
      }
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

      <ButtonToggleGroup
        highlightBackgroundColor={'#8FB1C0'}
        highlightTextColor={'white'}
        inactiveBackgroundColor={'transparent'}
        inactiveTextColor={'grey'}
        values={['Título', 'Costo', 'Cuartos', 'Baños']}
        onSelect={val => updateIndex(val)}
        style={{width: "97.8%", marginTop: "-5%"}}
        textStyle={{fontSize: 12}}
      />

      <View style={styles.lowbtn}>
        <View style={selectedIndex=="Título" ? styles.isSelectStyle : styles.isNotSelectStyle}></View>
        <View style={selectedIndex=="Costo" ? styles.isSelectStyle : styles.isNotSelectStyle}></View>
        <View style={selectedIndex=="Cuartos" ? styles.isSelectStyle : styles.isNotSelectStyle}></View>
        <View style={selectedIndex=="Baños" ? styles.isSelectStyle : styles.isNotSelectStyle}></View>
      </View>

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
  const { home, navigation } = props;
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
  lowbtn: {
    width: "100%",
    height: "5%",
    flexDirection: "row",
    marginBottom: "5%"
  },
  isSelectStyle: {
    width: "25%",
    backgroundColor: "#8FB1C0"
  },
  isNotSelectStyle: {
    width: "25%",
    backgroundColor: "#F3F3F3"
  }


});