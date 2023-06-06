import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TouchableWithoutFeedback } from 'react-native';

const RadioButton = () => {
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>

      <TouchableWithoutFeedback style={styles.estilo}>
        <View style={styles.estilo}></View>
      </TouchableWithoutFeedback>

      <TouchableOpacity onPress={handleChecked} style={styles.radioButtonContainer}>
        <View style={[styles.radioButtonIcon, checked ? styles.radioButtonIconChecked : null]} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -407,
    marginLeft: 286
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonIcon: {
    width: 15,
    height: 10,
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    marginRight: 10,
    marginLeft: 3.4,
    marginTop: -22
  },
  radioButtonIconChecked: {
    backgroundColor: '#F24E1E',
    borderColor: '#F24E1E'
  },
  estilo: {
    width: 22,
    height: 22,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#F24E1E',
    marginRight: 10,
    marginTop: 48
  },

});

export default RadioButton;