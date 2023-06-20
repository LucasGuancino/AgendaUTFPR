import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../src/firebaseConfig';

import addIcon from '../icons/adicionar.png'; 
import removeIcon from '../icons/remover.png'; 

export default function Agenda({ route }) {
  const { dateString } = route.params;
  const navigation = useNavigation();
  const [timeInputs, setTimeInputs] = useState([{ startTime: '', endTime: '', location: '', nomeServidor: '' }]);
  const user = firebase.auth().currentUser;
  const [userName, setUserName] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nomeServidor, setNomeServidor] = useState('');
  const [agendas, setAgendas] = useState([]);

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

  useEffect(() => {
    const loadAgendas = async () => {
      try {
        const snapshot = await firebase.database().ref('Agenda').child(dateString).child(user.uid).once('value');
        const agendaData = snapshot.val();
        if (agendaData) {
          const loadedAgendas = Object.values(agendaData);
          setAgendas(loadedAgendas);
        } else {
          // Adicionar um item vazio se a lista estiver vazia
          setAgendas([{ startTime: '', endTime: '', location: '', nomeServidor: nomeServidor }]);
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao carregar as agendas.");
      }
    };

    loadAgendas();
  }, [dateString, user.uid]);

  const handleAddTimeInput = () => {
    const newTimeInput = { startTime: '', endTime: '', location: '', nomeServidor: nomeServidor };
    const updatedAgendas = [...agendas, newTimeInput];
  
    setTimeInputs(updatedAgendas);
    setAgendas(updatedAgendas);
  };
  

  const handleRemoveTimeInput = (index) => {
    const updatedAgendas = [...agendas];
    updatedAgendas.splice(index, 1);
    setAgendas(updatedAgendas);
  };

  async function SalvarAlteracoes() {
    try {
      const updatedAgendas = [...agendas];
      await Promise.all(
        updatedAgendas.map(async (agenda, index) => {
          if (agenda.nomeServidor === '') {
            agenda.nomeServidor = `${userName.trim()} ${sobrenome.trim()}`;
            updatedAgendas[index] = agenda;
          }
        })
      );
  
      const userRef = firebase.database().ref('Agenda').child(dateString).child(user.uid);
      await userRef.set(updatedAgendas);
      alert("Agenda salva com sucesso!");
      navigation.goBack();
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
      <Text style={styles.subtitle}>Defina seus horários do dia:</Text>
      <Text style={styles.date}>{dateString}</Text>
      {agendas.map((agenda, index) => (
        <View key={index}>
          <View style={styles.timeInputsContainer}>
            <TextInput
              style={styles.timeInput}
              placeholder="08:00"
              value={agenda.startTime}
              onChangeText={text => {
                const updatedAgendas = [...agendas];
                updatedAgendas[index].startTime = text;
                setAgendas(updatedAgendas);
              }}
            />
            <Text style={styles.timeSeparator}>-</Text>
            <TextInput
              style={styles.timeInput}
              placeholder="17:00"
              value={agenda.endTime}
              onChangeText={text => {
                const updatedAgendas = [...agendas];
                updatedAgendas[index].endTime = text;
                setAgendas(updatedAgendas);
              }}
            />
            <TextInput
              style={styles.placeInput}
              placeholder="Local"
              value={agenda.location}
              onChangeText={text => {
                const updatedAgendas = [...agendas];
                updatedAgendas[index].location = text;
                setAgendas(updatedAgendas);
              }}
            />
            {index === agendas.length - 1 ? (
              <TouchableOpacity onPress={handleAddTimeInput}>
                <Image style={styles.icon} source={addIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleRemoveTimeInput(index)}>
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
