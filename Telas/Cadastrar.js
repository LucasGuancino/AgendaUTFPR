import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import firebase from '../src/firebaseConfig';

export default function App() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [Confirmarsenha, setConfirmarsenha] = useState('');
  const [isServidor, setIsServidor] = useState(false);
  const navigation = useNavigation();

  async function CadastrarDados(){
    if(senha !== Confirmarsenha){
      alert("As senhas devem ser idênticas!");
      return;
    };
    if(nome !== '' && sobrenome !== '' && telefone !== '' && email !== '' && senha !=='' && Confirmarsenha !==''){
      await firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then((value) =>{
        firebase.database().ref('Usuarios').child(value.user.uid).set({
          nome: nome,
          sobrenome: sobrenome,
          telefone: telefone,
          email: email,
          senha: senha,
          isServidor: isServidor,
        })
        alert("Cadastro realizado com sucesso!")
        navigation.goBack();
      })
      .catch(() =>{
        alert("Erro ao cadastrar");
        return;
      })
      setNome('');
      setSobrenome('');
      setTelefone('');
      setEmail('');
      setSenha('');
      setConfirmarsenha('');
      setIsServidor(false);
    }else {
      alert("Preencha os dados!");
    };
    
  };

  function handleServidorPress() {
    setIsServidor(!isServidor); // Inverter valor do estado do checkbox
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>

      <TextInput
        placeholder="Nome"
        style={styles.textInput}
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        placeholder="Sobrenome"
        style={styles.textInput}
        value={sobrenome}
        onChangeText={(text) => setSobrenome(text)}
      />
      <TextInput
        placeholder="Telefone"
        style={styles.textInput}
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.textInput}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Senha"
        style={styles.textInput}
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar senha"
        style={styles.textInput}
        value={Confirmarsenha}
        onChangeText={(text) => setConfirmarsenha(text)}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isServidor}
          onValueChange={setIsServidor}
        />
        <TouchableOpacity onPress={handleServidorPress}>
          <Text style={styles.checkboxLabel}>Servidor da UTFPR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnCadastro} onPress={CadastrarDados}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Já possui uma conta? Faça o Login!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 14,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  btnCadastro: {
    backgroundColor: '#F24E1E',
    width: '100%',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 14,
    marginTop: 20,
    fontWeight: 'bold',
  },
});
