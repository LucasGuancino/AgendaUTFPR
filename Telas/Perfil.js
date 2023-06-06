import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import Footer from "../Comp/Footer";
import { useNavigation } from '@react-navigation/native';
import firebase from '../src/firebaseConfig';

const Foto = require("../icons/foto.png");
const linkgoogle = require("../icons/googleagenda.png");
const linkutf = require("../icons/utfprlogo.png");
const sair = require("../icons/sair.png");
const editar = require("../icons/editar.png");
const fechar = require("../icons/fechar.png");

const Profile = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [campus, setCampus] = useState("");
  const navigation = useNavigation();
  const user = firebase.auth().currentUser;
  const [userName, setUserName] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    const userRef = firebase.database().ref('Usuarios').child(user.uid);
  
    userRef.once('value', (snapshot) => {
      const userData = snapshot.val();
      
      setUserName(userData.nome);
      setSobrenome(userData.sobrenome);
      setEmail(userData.email);
      setTelefone(userData.telefone);
      setCampus(userData.campus);
      setCurso(userData.cursoocupacao);
    });
  }, []);

  async function handleEditPress(){
    const userRef = firebase.database().ref('Usuarios').child(user.uid);
    try {
      await userRef.update({
        cursoocupacao: curso,
        campus: campus,
        telefone: telefone,
      });
      alert('Dados alterados com sucesso.');
    } catch (error) {
      alert('Erro ao alterar os dados.');
    }
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };  

  const handleLogout = async () =>{
      try{
        await firebase.auth().signOut();
        alert("Usuario deslogado.")
        return navigation.navigate('Inicial')
      }catch(error){
        alert("Ocorreu um problema ao fazer o logout")
        return;
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={Foto} />
        <View style={styles.userNameContainer}>
          <Text style={styles.name}>{userName} {sobrenome}</Text>
          <TouchableOpacity onPress={() => setShowPopup(true)}>
            <Image style={styles.editIcon} source={editar} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.item}>
          <Text style={styles.description}>E-mail: {email} </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.description}>Curso/Ocupação:{curso} </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.description}>Câmpus: {campus}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.description}>Telefone: {telefone}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => alert('Ainda não é possivel sincronizar os dados Google Agenda')}>
          <Image style={styles.buttonIcon} source={linkgoogle}/>
          <Text style={styles.buttonText}>Sincronizar com Google Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => alert('Ainda não é possivel sincronizar os dados UTFPR')}>
          <Image style={styles.buttonIcon} source={linkutf} />
          <Text style={styles.buttonText}>
            Sincronizar com sistema da UTFPR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={handleLogout}>
          <Image style={styles.image} source={sair} />
        </TouchableOpacity>
        <Modal visible={showPopup} transparent>
          <TouchableWithoutFeedback onPress={handleClosePopup}>
          <View style={styles.popupBackground}></View>
          </TouchableWithoutFeedback>
          <View style={styles.popupContainer}>
            <TouchableOpacity
              style={styles.closebutton}
              onPress={handleClosePopup}
            >
              <Image source={fechar} style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.popupTitle}>Editar Dados</Text>
            <TextInput
              style={styles.input}
              placeholder="Alterar Curso ou Ocupação"
              onChangeText={setCurso}
              value={curso}
            />
            <TextInput
              style={styles.input}
              placeholder="Alterar Câmpus"
              onChangeText={setCampus}
              value={campus}
            />
            <TextInput
              style={styles.input}
              placeholder="Alterar Telefone"
              onChangeText={setTelefone}
              value={telefone}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleEditPress}
            >
              <Text style={styles.buttonText}>Gravar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    alignItems: "center",
    marginTop: 50
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    marginBottom: 10
  },
  button: {
    backgroundColor: "#F24E1E",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  image: {
    width: 101,
    height: 45
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  editIcon: {
    width: 24,
    height: 24,
    marginLeft: 10
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10
  },
  popupBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  popupContainer: {
    position: "absolute",
    top: "20%",
    left: "10%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center"
  },
  closeIcon: {
    width: 14,
    height: 14
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  closebutton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10
  }
});

export default Profile;
