import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const logoIcon = require("../icons/Logo.png");

const Inicial = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={logoIcon} style={styles.logo} />
      <Text style={styles.title}>Agenda UTFPR</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastrar')}>
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Todos os direitos reservados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  logo: {
    width: 136,
    height: 144,
    marginBottom: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#F24E1E",
    marginBottom: 20
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: "#F24E1E",
    padding: 10,
    borderRadius: 20,
    width: 200,
    alignItems: "center",
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    fontSize: 18
  },
  footer: {
    color: "black",
    position: "absolute",
    bottom: 0,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "bold"
  }
});

  
export default Inicial;
