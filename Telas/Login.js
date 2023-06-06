import { useState, Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../src/firebaseConfig';

const logoIcon = require("../icons/Logo.png");

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  async function logar(){
    await firebase.auth().signInWithEmailAndPassword(email, senha).then((value) =>{
      alert("Logado com sucesso");
      navigation.navigate('Home');
      setEmail('');
      setSenha('');
    }
    ).catch(() =>{
        alert("Email ou senha incorretos.");
        return;
      }
    )
  }

  return (
    <View style={styles.container}>
      <Image source={logoIcon} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={email} onChangeText={text=>setEmail(text)} placeholder="E-mail" />
        <TextInput style={styles.input} value={senha} onChangeText={text=>setSenha(text)} placeholder="Senha" secureTextEntry={true} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => logar()}>
        <Text style={styles.buttonText}>Logar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}>
        <Text style={styles.footerText}>Não possui uma conta? Crie agora!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 136,
    height: 144,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#D9D9D9',
  },
  button: {
    backgroundColor: '#F24E1E',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  footerText: {
    fontSize: 12,
    fontWeight: 'bold'
  },
});

export default LoginScreen;
