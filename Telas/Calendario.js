import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Footer from "../Comp/Footer";
import { useNavigation } from '@react-navigation/native';
import firebase from '../src/firebaseConfig';

const inativoIcon = require("../icons/inativo.png")
const ativoIcon = require("../icons/ativo.png")

LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt';

export default function Calendario(){
  const navigation = useNavigation();
  const [isServidor, setIsServidor] = useState(false);
  const [filtro, setFiltro] = useState('');
  const user = firebase.auth().currentUser;
  
  useEffect(() => {
    const userRef = firebase.database().ref('Usuarios').child(user.uid);  
    userRef.once('value', (snapshot) => {
      const userData = snapshot.val();
      setIsServidor(userData.isServidor);
    });
  }, []);

  const initialMarkedDates = {
    "2023-05-02": {
      selected: true,
      marked: true,
      selectedColor: "#F24E1E",
      dotColor: "#F24E1E"
    },
    "2023-05-04": {
      selected: true,
      marked: true,
      selectedColor: "#F24E1E",
      dotColor: "#F24E1E",
    }
  };

  const [markedDates, setMarkedDates] = useState(initialMarkedDates);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateSelect = (date) => {
    
    const newMarkedDates = { ...initialMarkedDates };
    const dateString = date.dateString;
    if (selectedDate) {
      newMarkedDates[selectedDate] = {
        ...newMarkedDates[selectedDate],
        selected: false
      };
    }
    newMarkedDates[dateString] = {
      ...newMarkedDates[dateString],
      selected: true,
      selectedColor: "#d3d3d3"
    };
    setSelectedDate(dateString);
    setMarkedDates(newMarkedDates);
    if(isServidor){
      navigation.navigate('InfoAgendamento');
    }else{
      navigation.navigate('InfoAgendamentoUsuario');
    }
  };

  const containerStyles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
  });

  const calendarStyles = StyleSheet.create({
    calendar: {
      borderWidth: 1,
      padding: 10,
      borderRadius: 20,
      borderColor: "gray",
      height: 380,
      width: 350,
      marginBottom: 10,
      marginTop: 10
    }
  });

  return(
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>          
          <TextInput
              style={styles.buttonText}
              placeholder="Filtro"
              onChangeText={setFiltro}
              value={filtro}
            />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Mostrando a agenda de:</Text>
      <View style={containerStyles.container}>
      <Calendar
        style={calendarStyles.calendar}
        onDayPress={handleDateSelect}
        markedDates={markedDates}
        markingType="simple"
      />
      </View>
      <Text style={styles.text}> <Image source={inativoIcon}/> Dias sem agenda </Text>
      <Text style={styles.text}> <Image source={ativoIcon}/> Dias com agenda </Text>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
    marginLeft: 18,
    marginTop: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 50,
    marginLeft: 18
  },
  button: {
    backgroundColor: "#d3d3d3",
    padding: 10,
    borderRadius: 20,
    width: 350,
    height: 50,
    marginBottom: 10
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    marginLeft: 10,
    alignItems: "center",
  },
});