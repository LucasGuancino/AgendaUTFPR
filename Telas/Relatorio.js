import React from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import Footer from "../Comp/Footer";
import { useNavigation } from '@react-navigation/native';

const voltar = require("../icons/voltar.png");
const relatorio = require("../icons/relatorio.png");
const importarRelatorio = require("../icons/importarRelatorio.png");
const pdf = require("../icons/pdf.png");

export default function Relatorio() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Atendimento N° 2000</Text>

      <View style={styles.imagem}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.voltar} source={voltar}/>
        </TouchableOpacity>
      </View>

      <TouchableWithoutFeedback style={styles.info}>
        <View style={styles.info}>
          <Text style={{marginLeft: 15, fontSize: 20, fontWeight: 'bold',}}>Informações:</Text>
          <Text></Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Data: 04/04/2023 - 08:00 às 10:00</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Aluno(a): Luana De Souza</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>RA: 9999999</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Nome: Redistribuição de tarefas.</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Servidor: Fausto Silva</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Local: UTFPR</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableOpacity style={styles.button}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Gerar Relatório</Text>
          <View style={styles.icone}>
                  <Image style={{marginTop: -25}} source={relatorio}/>
                </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Importar relatório</Text>
          <View style={styles.icone}>
                  <Image style={{marginTop: -25}} source={importarRelatorio}/>
                </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonPdf}>
          <Text style={{fontWeight: 'bold', marginLeft: 40}}>relatorio04042023.pdf</Text>
          <View style={styles.icone}>
                  <Image style={{marginTop: -25}} source={pdf}/>
                </View>
        </TouchableOpacity>

      <Footer />
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100
  },
titulo: {
    fontSize: 27,
    marginLeft: 25,
    fontWeight: 'bold'
},
voltar: {
  marginLeft: 325,
  marginTop: -70
},
info: {
  backgroundColor: "#D9D9D9",
  padding: 20,
  width: 350,
  height: 235,
  borderRadius: 30,
  marginLeft: 20,
  marginTop: 35
},
button: {
  backgroundColor: "#F24E1E",
  padding: 15,
  width: 325,
  borderRadius: 50,
  marginLeft: 30,
  marginTop: 30,
  display: 'none', //propriedade para deixar visible = false, criar um style separado para essa propriedade e deixar display 'none' apenas para alunos
},
buttonPdf: {
  backgroundColor: "#D9D9D9",
  padding: 10,
  width: 250,
  borderRadius: 50,
  marginLeft: 70,
  marginTop: 40,
  display: 'none', //propriedade para deixar visible = false, criar um style separado para essa propriedade e deixar display 'none' apenas para alunos
},

});