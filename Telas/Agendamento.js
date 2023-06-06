import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Footer from "../Comp/Footer";
import { useNavigation } from "@react-navigation/native";
import firebase from '../src/firebaseConfig';

const voltar = require("../icons/voltar.png");

export default function Agendamento({ route }) {
  const { codigo } = route.params;
  const navigation = useNavigation();
  const [horafim, setHoraFim] = useState('');
  const [horainicio, setHoraInicio] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nomeAluno, setNomeAluno] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const user = firebase.auth().currentUser;
  let userId = '';

  useEffect(() => {    
    async function carregaDados() {
      const Servidor = 'Lucas';
      const usersRef = firebase.database().ref('Usuarios');
    
      usersRef.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          const nome = userData.nome;
          const childUserId = childSnapshot.key;
      
          if (nome === Servidor) {
            userId = childUserId;
          }
        });
      });
      await firebase.database().ref("Agenda").child(userId).child(codigo).on("value", (snapshot) => { // passar por parametro id do servidor e o index
          setHoraFim(snapshot.val().endTime);
          setHoraInicio(snapshot.val().startTime);
          setLocal(snapshot.val().location);
        });
    }
    carregaDados();
  }, []);

  async function agendarDados(){
    const refUsuarios = firebase.database().ref('Usuarios').child(user.uid);
  
    refUsuarios.once('value', (snapshot) => {
      const userData = snapshot.val();
      setNome(userData.nome);
      setSobrenome(userData.sobrenome);
    });

    const userRef = firebase.database().ref('Agenda').child(userId).child(0); // passar por parametro id do servidor e o index
    try {
      const nomeAluno = '${nome.trim()} ${sobrenome.trim()}'
      await userRef.update({
        descricao: descricao,
        nomeAluno: nomeAluno,        
      });
      alert(descricao + ' Foi agendado com sucesso.');
    } catch (error) {
      alert('Ocorreu um erro ao fazer o agendamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Realizar agendamento</Text>
      <View style={styles.imagem}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.voltar} source={voltar} />
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          placeholder="Descrição do agendamento"
          style={styles.TextInput}
          onChangeText={setDescricao}
          value={descricao}
        />
      </View>

      <View>
        <Text style={styles.date}>25/05/2023</Text>
      </View>

      <View style={styles.containerDois}>
        <TouchableOpacity style={styles.buttonHoraInicio}>
          <Text style={styles.info}>{horainicio}</Text>
        </TouchableOpacity>

        <Text style={styles.esp}>-</Text>

        <TouchableOpacity style={styles.buttonHoraFim}>
          <Text style={styles.info}>{horafim}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonLocal}>
          <Text style={styles.info}>{local}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.linha}></View>
      <TouchableOpacity style={styles.buttonAgendar} onPress={() => agendarDados()}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 18,
    marginLeft: 30,
    fontWeight: "bold",
    marginTop: 100,
  },
  voltar: {
    marginLeft: 325,
    marginTop: -55,
  },
  buttonAgendar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F24E1E",
    padding: 20,
    width: 300,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  TextInput: {
    backgroundColor: "gainsboro",
    fontWeight: "bold",
    borderRadius: 50,
    width: 320,
    marginLeft: 35,
    marginTop: 53,
    padding: 20,
  },
  date: {
    marginLeft: 20,
    fontSize: 20,
    marginTop: 30,
    fontWeight: "bold",
  },
  containerDois: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 20,
  },
  buttonHoraInicio: {
    borderWidth: 1,
    width: 60,
    paddingVertical: 10,
    borderRadius: 13,
    marginRight: 10,
  },
  buttonHoraFim: {
    borderWidth: 1,
    width: 60,
    paddingVertical: 10,
    borderRadius: 13,
    marginRight: 10,
  },
  buttonLocal: {
    borderWidth: 1,
    width: 90,
    paddingVertical: 10,
    borderRadius: 13,
    marginRight: 10,
  },
  esp: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  linha: {
    height: 2,
    backgroundColor: "#F24E1E",
    marginLeft: 20,
    marginRight: 10,
    marginTop: 15,
  },
  info: {
    textAlign: "center",
  },
});
