import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import Footer from "../Comp/Footer";
import { useNavigation } from '@react-navigation/native';
import firebase from '../src/firebaseConfig';

const Foto = require("../icons/foto.png");
const logoIcon = require("../icons/logoHome.png");

const Profile = () => {
  const navigation = useNavigation();
  const user = firebase.auth().currentUser;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userRef = firebase.database().ref('Usuarios').child(user.uid).child('nome');
  
    userRef.once('value', (snapshot) => {
      const name = snapshot.val();
      setUserName(name);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Image style={styles.avatar} source={Foto}/>
        <Text style={styles.name}>{userName}</Text>
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.item1}> Olá {userName}</Text>
        </View>
        <Image source={logoIcon} style={styles.logo} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendario')}>
          <Text style={styles.buttonText}>Calendário</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
    },
    name: {
      padding: -20,
      borderRadius: 40,
      marginBottom: 30,
      alignItems: "center",
      textAlign: 'center',
      fontSize: 19,
      fontWeight: "bold",
      marginTop: -40,
      width: 210,
    },
    content: {
      marginTop: 50,
      marginHorizontal: 10,
      padding: 20,
      marginBottom: 10,
      width: 370,
    },
    content2: {
      marginTop: 15,
      marginHorizontal: -10,
      backgroundColor: "#d3d3d3",
      padding: 35,
      borderRadius: 30,
      marginBottom: 10,
      width: 370,
      height: 200,
      overflow: 'scroll',
      flexWrap: "wrap",
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
      padding: -10,
    },
    logo: {
      alignSelf: "center",
      marginLeft: 30
    },  
    item1: {
      alignItems: "center",
      textAlign: 'center',
      marginBottom: 40,
      width: 230,
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 5
    },
    description: {
      fontSize: 16,
      marginBottom: -15,
    },
    description1: {
      fontSize: 14,
      marginBottom: -8,
      padding: 0,
    },
    button: {
      marginTop: 40,
      marginHorizontal: 50,
      backgroundColor: "#F24E1E",
      padding: 15,
      borderRadius: 40,
      marginBottom: 40,
      width: 240,
      alignItems: "center"
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 20,
    },
  });

  export default Profile;

  