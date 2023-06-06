import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../src/firebaseConfig';

import addIcon from '../icons/adicionar.png'; 
import removeIcon from '../icons/remover.png'; 

export default function Agenda(){
  const navigation = useNavigation();
  const [timeInputs, setTimeInputs] = useState([{ startTime: '', endTime: '', location: '', nomeServidor: '' }]);
  const user = firebase.auth().currentUser;
  const [userName, setUserName] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nomeServidor, setNomeServidor] = useState('');

  useEffect(() => {
    const userRef = firebase.database().ref('Usuarios').child(user.uid);
  
    userRef.once('value', (snapshot) => {
      const userData = snapshot.val();
      setUserName(userData.nome);
      setSobrenome(userData.sobrenome);
    });
  }, []);

  useEffect(() => {
    const nomeServidorAtualizado = `${userName.trim()} ${sobrenome.trim()}`;
    setNomeServidor(nomeServidorAtualizado);
  }, [userName, sobrenome]);

  const handleAddTimeInput = () => {
    setTimeInputs([...timeInputs, { startTime: '', endTime: '', location: '', nomeServidor: nomeServidor }]);
  };

  const handleRemoveTimeInput = () => {
    if (timeInputs.length > 1) {
      setTimeInputs(timeInputs.slice(0, timeInputs.length - 1));
    }
  };

  async function SalvarAlteracoes() {
    try {
      const updatedTimeInputs = [...timeInputs];
      await Promise.all(
        updatedTimeInputs.map(async (input, index) => {
          if (input.nomeServidor === '') {
            input.nomeServidor = `${userName.trim()} ${sobrenome.trim()}`;
            updatedTimeInputs[index] = input;
          }
        })
      );
  
      const userRef = firebase.database().ref('Agenda').child(user.uid);
      await userRef.set(updatedTimeInputs);
      alert("Agenda salva com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar a agenda.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Image
            style={styles.profileImage}
            source={require('../icons/foto.png')} 
          />
        </TouchableOpacity>
        <Text style={styles.name}>{userName}</Text>       
      </View>
      <Text style={styles.subtitle}>Defina seus horarios do dia:</Text>
      <Text style={styles.date}>25 de Maio de 2023</Text>
      {timeInputs.map((timeInput, index) => (
        <View key={index}>
          <View style={styles.timeInputsContainer}>
            <TextInput
              style={styles.timeInput}
              placeholder="08:00"
              value={timeInput.startTime}
              onChangeText={text => {
                const updatedInputs = [...timeInputs];
                updatedInputs[index].startTime = text;
                setTimeInputs(updatedInputs);
              }}
            />
            <Text style={styles.timeSeparator}>-</Text>
            <TextInput
              style={styles.timeInput}
              placeholder="17:00"
              value={timeInput.endTime}
              onChangeText={text => {
                const updatedInputs = [...timeInputs];
                updatedInputs[index].endTime = text;
                setTimeInputs(updatedInputs);
              }}
            />
            <TextInput
              style={styles.placeInput}
              placeholder="Local"
              value={timeInput.location}
              onChangeText={text => {
                const updatedInputs = [...timeInputs];
                updatedInputs[index].location = text;
                setTimeInputs(updatedInputs);
              }}
            />
            {index === timeInputs.length - 1 ? (
              <TouchableOpacity onPress={handleAddTimeInput}>
                <Image style={styles.icon} source={addIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleRemoveTimeInput}>
                <Image style={styles.icon} source={removeIcon} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.line} />
        </View>
      ))}
      <TouchableOpacity style={styles.saveButton} onPress={SalvarAlteracoes}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
      {/* <Footer /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  timeInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#F24E1E',
    marginRight: 10,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  timeSeparator: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  placeInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#F24E1E',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#F24E1E',
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#F24E1E',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
