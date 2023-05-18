import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Footer from "../Comp/Footer";
import { useNavigation } from '@react-navigation/native';


const relogioicon = require("../icons/relogio.png");
const localizacaoicon = require("../icons/localizacao.png");
const balaoicon = require("../icons/balao.png");

const InfoAgendamento = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>04 de Abril de 2023</Text>
        <View>
        <TouchableOpacity onPress={() => navigation.navigate('Relatorio')}>  
        <View style={styles.item}>
        <Image source={relogioicon} style={styles.relogio} />
          <Text style={styles.description}> 08:00 às 10:00 </Text>
        </View>
        <View style={styles.item}>
        <Image source={localizacaoicon} style={styles.localizacao} />
          <Text style={styles.description}>UTFPR </Text>
        </View>
        <View style={styles.item}>
        <Image source={balaoicon} style={styles.balao} />
          <Text style={styles.description}> Redistribuição de tarefas </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.description}> ____________________________ </Text>
        </View>
        </TouchableOpacity>
        </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Agendamento')}>
          <Text style={styles.buttonText}>Realizar Agendamento</Text>
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
    marginTop: -20

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
    marginBottom: 10
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
  localizacao:{
    marginLeft: -15,
  },
  balao:{
    marginLeft: -10,
  },
  relogio:{
    marginLeft: -10,
  }
});

export default InfoAgendamento;
