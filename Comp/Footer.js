import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

const homeIcon = require("../icons/home.png");
const calendarIcon = require("../icons/calendario.png");
const userIcon = require("../icons/user.png");

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={() => navigation.navigate('Calendario')}>
        <Image source={calendarIcon} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.button, styles.centerButton]} onPress={() => navigation.navigate('Home')}>
        <Image source={homeIcon} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={() => navigation.navigate('Perfil')}>
        <Image source={userIcon} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F24E1E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  button: {
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  leftButton: {
    marginLeft: 10
  },
  rightButton: {
    marginRight: 10
  },
  centerButton: {
    borderWidth: 1,
    borderColor: "#F24E1E",
    backgroundColor: "#FFFFFF",
    marginTop: -50
  },
  buttonImage: {
    width: 30,
    height: 30
  }
});

export default Footer;
