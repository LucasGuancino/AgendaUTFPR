import React from "react";
import { useState} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const logoIcon = require("../icons/Logo.png");

export default function App() {
  const navigation = useNavigation();  
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')

  return (
    <View style={styles.container}>
      <Image source={logoIcon} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder='       E-mail' style={styles.TextInput} onChangeText={text=>setLogin(text)} />
      <TextInput secureTextEntry={true} placeholder='       Senha' style={styles.TextInput} onChangeText={text=>setSenha(text)} /> 
      <Text style={styles.text}>Esqueceu a Senha?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer} onPress={() => navigation.navigate('Cadastrar')}>Não possui uma conta? Crie Agora!</Text>
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
    fontSize: 30,
    color: "black",
    marginBottom: 50
  },
  buttonContainer: {
    marginTop: 25,
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
    marginBottom: 40,
    fontSize: 12,
    fontWeight: "bold"
  },
  TextInput:{
    width:'80%',
    height: 50,
    backgroundColor:'#d3d3d3',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginBottom: 15,
    fontSize: 14
  },
  text:{
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
    marginBottom: 12,
    marginTop: 10
  }
});
