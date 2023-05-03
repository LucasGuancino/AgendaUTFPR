import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const MyCheckbox = () => {
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={handleChecked} style={styles.checkboxContainer}>
        <View style={[styles.checkboxIcon, checked ? styles.checkboxIconChecked : null]}>
          {checked && <Icon name="check" size={15} color="#fff" />}
        </View>
        <Text style={styles.checkboxText}>Servidor DEPED</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignItems: 'center'
  },
  checkboxIcon: {

    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#F24E1E',
    backgroundColor: '#fff',
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  checkboxIconChecked: {
    backgroundColor: '#F24E1E',
    borderColor: '#2B9FE3',
  },
  checkboxText: {
    fontSize: 15,
    width: 240
  },
});

export default MyCheckbox;