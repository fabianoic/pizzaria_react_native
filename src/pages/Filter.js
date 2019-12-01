import React, {useState, useEffect} from 'react';

import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Snackbar, Modal, Text, TextInput} from 'react-native-paper';

import api from '../services/api';

export default function Filter({navigation}) {
  const [pedidos, setPedidos] = useState([]);
  const [mesa, setMesa] = useState('');
  const [snackVisible, setSnackVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api
      .get('pedido/all')
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });

  const handleCreate = async e => {
    const response = await api
      .post('pedido/', {
        mesa,
      })
      .catch(error => {
        setSnackVisible(true);
      });
    if (response.status !== null && response.status === 201) {
      navigation.navigate('Info', response.data);
    }
  };

  return (
    <>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={2000.0}>
        {'Favor informe uma mesa.'}
      </Snackbar>
      <TouchableOpacity
        style={styles.mesaButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.addMesaButton}>Adicionar mesa</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          data={pedidos}
          keyExtractor={(pedido, index) => `list-index-${index}`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Info', item);
              }}>
              <View style={styles.listMesa}>
                <Text>Mesa {item.mesa}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal
        style={styles.model}
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.labelMesa}>Cadastro de mesa </Text>
          <Text>__________________________________________</Text>
          <TextInput
            style={styles.inputMesa}
            placeholder="Digite uma nova mesa"
            onChangeText={numMesa => setMesa(numMesa)}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              handleCreate();
            }}>
            <Text style={styles.addMesaButton}>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={styles.addMesaButton}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
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
