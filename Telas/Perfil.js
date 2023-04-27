import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Footer from "../Comp/Footer";

const Foto = require("../icons/foto.png");
const linkgoogle = require("../icons/googleagenda.png");
const linkutf = require("../icons/utfprlogo.png");
const sair = require("../icons/sair.png");

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={Foto} />
        <Text style={styles.name}>Usuário não informado</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.item}>
          <Text style={styles.description}>RA: </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.description}>E-mail: </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.description}>Curso: </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.description}>Cãmpus:</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Image style={styles.buttonIcon} source={linkgoogle} />
          <Text style={styles.buttonText}>Sincronizar com Google Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image style={styles.buttonIcon} source={linkutf} />
          <Text style={styles.buttonText}>
            Sincronizar com sistema da UTFPR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer}>
          <Image style={styles.image} source={sair} />
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    alignItems: "center",
    marginTop: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  itemIcon: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  description: {
    fontSize: 16,
    marginBottom: 10
  },
  button: {
    backgroundColor: "#F24E1E",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  image: {
    width: 101,
    height: 45
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Profile;
