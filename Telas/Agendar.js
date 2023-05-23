import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from '../Comp/Footer';
import { useNavigation } from '@react-navigation/native';

import addIcon from '../icons/adicionar.png'; 
import removeIcon from '../icons/remover.png'; 

const Agendar = () => {
  const navigation = useNavigation();
  const [timeInputs, setTimeInputs] = useState([{}]);

  const handleAddTimeInput = () => {
    setTimeInputs([...timeInputs, {}]);
  };

  const handleRemoveTimeInput = () => {
    if (timeInputs.length > 1) {
      setTimeInputs(timeInputs.slice(0, timeInputs.length - 1));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Image
          style={styles.profileImage}
          source={require('../icons/foto.png')} 
        />
        </TouchableOpacity>
        <Text style={styles.name}>Aluno</Text>        
      </View>
      <Text style={styles.subtitle}>Defina seus horários do dia:</Text>
      <Text style={styles.date}>04 de Abril de 2023</Text>
      {timeInputs.map((timeInput, index) => (
        <View key={index}>
          <View style={styles.timeInputsContainer}>
            <TextInput style={styles.timeInput} placeholder="08:00" />
            <Text style={styles.timeSeparator}>-</Text>
            <TextInput style={styles.timeInput} placeholder="17:00" />
            <TextInput style={styles.placeInput} placeholder="Local" />
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
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

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

export default Agendar;
