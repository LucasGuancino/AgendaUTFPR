import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import Footer from "../Comp/Footer";
import { useNavigation } from '@react-navigation/native';
import firebase from '../src/firebaseConfig';

const relogioicon = require("../icons/relogio.png");
const localizacaoicon = require("../icons/localizacao.png");
const balaoicon = require("../icons/balao.png");
const usericon = require("../icons/usericon.png");

const InfoAgendamento = ({ route }) => {
  const { dateString } = route.params;
  const navigation = useNavigation();
  const user = firebase.auth().currentUser;
  const selectedUser = user.uid;
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function ConsultarDados() {
      await firebase.database().ref('Agenda').child(dateString).child(user.uid).on('value', (snapshot) => {
        setAgendamentos([]);

        snapshot.forEach((item, index) => {
          let data = {
            codigo: index,
            DataInicio: item.val().startTime,
            DataFim: item.val().endTime,
            local: item.val().location,
            nomeServidor: item.val().nomeServidor,
            nomeAluno: item.val().nomeAluno,
            descricao: item.val().descricao,
          };

          setAgendamentos(old => [...old, data]);
        });
      });
    }

    ConsultarDados();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{dateString}</Text>
        <ScrollView style={styles.scrollView}>
          {agendamentos.map((data, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Relatorio', { dateString, selectedUser, index })}>
              <View style={styles.item}>
                <Image source={relogioicon} style={styles.relogio} />
                <Text style={styles.description}> {data.DataInicio} as {data.DataFim}</Text>
              </View>
              <View style={styles.item}>
                <Image source={usericon} style={styles.profile} />
                <Text style={styles.description}>Servidor: {data.nomeServidor} </Text>
              </View>
              <View style={styles.item}>
                <Image source={usericon} style={styles.profile} />
                <Text style={styles.description}>Aluno: {data.nomeAluno} </Text>
              </View>
              <View style={styles.item}>
                <Image source={localizacaoicon} style={styles.localizacao} />
                <Text style={styles.description}> {data.local}</Text>
              </View>
              <View style={styles.item}>
                <Image source={balaoicon} style={styles.balao} />
                <Text style={styles.description}> {data.descricao}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.description}> _____________________________ </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Agendar', { dateString })}>
        <Text style={styles.buttonText}>Editar Horários de Agendamento</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  name: {
    backgroundColor: "#a9a9a9dc",
    padding: 20,
    borderRadius: 40,
    marginBottom: 40,
    width: 230,
    alignItems: "center",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -20,
    color: "#000"
  },
  content: {
    marginTop: 60,
    marginHorizontal: 20,
    backgroundColor: "#d3d3d3",
    padding: 60,
    borderRadius: 40,
    marginBottom: 10,
    width: 360,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    padding: 3,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    flex: 1,
  },
  localizacao: {
    marginLeft: -5,
  },
  balao: {
    marginLeft: 0,
  },
  relogio: {
    marginLeft: 0,
  },
  profile: {
    marginLeft: -5,
    width: 25,
    height: 25,
  },
  scrollView: {
    maxHeight: 350, // Define a altura máxima desejada
  },
  button: {
    marginTop: 20,
    marginHorizontal: 80,
    backgroundColor: "#F24E1E",
    padding: 20,
    borderRadius: 40,
    marginBottom: 10,
    width: 250,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});  
  export default InfoAgendamento;