import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, RadioButton} from "react-native";
import Footer from "../Comp/Footer";
import RadioButtonSelecionar from "../Comp/RadioButton";
import { useNavigation } from '@react-navigation/native';

const voltar = require("../icons/voltar.png");

export default function Agendamento() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Realizar agendamento </Text>

      <View style={styles.imagem}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.voltar} source={voltar} />
        </TouchableOpacity>
      </View>

      <View>
      <TextInput placeholder='Descrição do agendamento' style={styles.TextInput} onChangeText={text=>setNome(text)} />
      </View>

      <View>
      <Text style={styles.date}>04 de abril de 2023 </Text>
      </View>
      
      <View style={styles.containerDois}>
      <TouchableOpacity style={styles.buttonHora}>
          <Text style={{marginLeft: 10,}}>08:00</Text> 
        </TouchableOpacity>

	      <TouchableOpacity style={styles.buttonHoraB}>
          <Text style={{marginLeft: 10}}>10:00</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.buttonTipo}>
          <Text style={{marginLeft: 23}}>UTFPR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerTres}>
      <TouchableOpacity style={styles.buttonHora}>
          <Text style={{marginLeft: 10}}>10:00</Text> 
        </TouchableOpacity>

	      <TouchableOpacity style={styles.buttonHoraB}>
          <Text style={{marginLeft: 10}}>12:00</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.buttonTipo}>
          <Text style={{marginLeft: 23}}>Meet</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerQuatro}>
      <TouchableOpacity style={styles.buttonHora}>
          <Text style={{marginLeft: 10}}>13:30</Text> 
        </TouchableOpacity>

	      <TouchableOpacity style={styles.buttonHoraB}>
          <Text style={{marginLeft: 10}}>15:00</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.buttonTipo}>
          <Text style={{marginLeft: 23}}>Meet</Text>
        </TouchableOpacity>
      </View>

<Text style= {{marginLeft: 310, marginTop: -96, fontSize: 13}}>Indisponível </Text>
<Text style= {{marginLeft: 310, marginTop: -83, fontSize: 13}}>Indisponível </Text>
<Text style= {{marginLeft: 103, marginTop: -14.5}}>-</Text>
<Text style= {{marginLeft: 103, marginTop: 54}}>-</Text>
<Text style= {{marginLeft: 103, marginTop: 48}}>-</Text>

<Text style= {styles.linha}>_____________</Text>
<Text style= {styles.linhaDois}>_____________</Text>

      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agendar</Text>
        </TouchableOpacity>

        <Text style= {{marginLeft: 315, marginTop: -236, fontSize: 13}}>Selecionar</Text>


<RadioButtonSelecionar />
      <Footer />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
  },
titulo: {
    fontSize: 18,
    marginLeft: 30,
    fontWeight: 'bold'
},
voltar: {
  marginLeft: 325,
  marginTop: -70
},
button: {
  backgroundColor: "#F24E1E",
  padding: 20,
  width: 300,
  borderRadius: 50,
  marginLeft: 45,
  marginTop: 200
},
buttonText: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 17
},
TextInput: {
  backgroundColor: "gainsboro",
  fontWeight: "bold",
  borderRadius: 50,
  width: 320,
  marginLeft: 35,
  marginTop: 53,
  padding: 20
},
date: {
  marginLeft: 20,
  fontSize: 20,
  marginTop: 30,
  fontWeight: 'bold'
},
containerDois: {
	marginLeft: 7,
  marginTop: 25,
  borderLeftWidth: 2,
  width: 300,
  borderColor: "#F24E1E",

},
containerTres: {
	marginLeft: 7,
  marginTop: 0,
  borderLeftWidth: 2,
  borderColor: "#F24E1E"

},
containerQuatro: {
	marginLeft: 7,
  width: 100,
  borderLeftWidth: 2,
  borderColor: "#F24E1E"
},
buttonHora: {
  borderWidth: 1,
  marginLeft: 20,
  width: 60,
  paddingVertical: 10,
  borderRadius: 13,
  marginTop: 25
},
buttonHoraB: {
  borderWidth: 1,
  marginLeft: 115,
  width: 60,
  paddingVertical: 10,
  borderRadius: 13,
  marginTop: -37

},
buttonTipo: {
  borderWidth: 1,
  marginLeft: 183,
  width: 90,
  paddingVertical: 10,
  borderRadius: 13,
  marginTop: -38
},
linha: {
  marginLeft: 7,
  color: "#F24E1E",
  fontSize: 20,
  marginTop: -135
},
linhaDois: {
  marginLeft: 7,
  color: "#F24E1E",
  fontSize: 20,
  marginTop: 45
},

});