import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';

// import { Container } from './styles';

export default function New({navigation}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Mesa"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="itens do pedido"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Text style={styles.addButton}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  modalView: {
    borderRadius: 8,
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    width: '85%',
    height: 300,
  },
  image: {
    marginRight: 20,
  },
  labelMesa: {
    fontSize: 27,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  listMesa: {
    height: 100,
    width: 100,
    backgroundColor: 'pink',
    borderColor: 'black',
    borderWidth: 0.75,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMesa: {marginVertical: 20},

  mesaButton: {
    backgroundColor: '#4682B4',
    borderRadius: 4,
    height: '10%',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 20,
  },
  addMesaButton: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  modalButton: {
    backgroundColor: '#4682B4',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 20,
    height: '14%',
  },
});
