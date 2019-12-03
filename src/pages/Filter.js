import React, {useState, useEffect} from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

import {Snackbar, Modal, Text, TextInput} from 'react-native-paper';

import api from '../services/api';

import plus from '../assets/plus1.png';

export function navigationOptionsFilterScreen({navigation}) {
  const setModalVisible = navigation.getParam('setModalVisible');

  return {
    headerRight: (
      <TouchableOpacity
        style={styles.image}
        onPress={() => setModalVisible(true)}>
        <Image source={plus} />
      </TouchableOpacity>
    ),
  };
}

export default function Filter({navigation}) {
  const [pedidos, setPedidos] = useState([]);
  const [mesa, setMesa] = useState('');
  const [snackVisible, setSnackVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setParams({setModalVisible});
    api
      .get('pedido/all')
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCreate = async e => {
    if (!mesa) {
      setSnackVisible(true);
      return;
    }

    const [mesaExistente] = pedidos.filter(p => p.mesa === mesa);

    if (mesaExistente) {
      alert('Mesa já existente');
      return;
    }

    const response = await api
      .post('pedido/', {
        mesa,
      })
      .catch(error => {
        console.log(error);
      });

    setMesa('');

    if (response.status === 201) {
      const pedidosAtualizados = [...pedidos, response.data];

      const ordenados = pedidosAtualizados.sort((a, b) => {
        return a.mesa < b.mesa ? -1 : 1;
      });

      setPedidos(ordenados);
      navigation.navigate('Info', {pedido: response.data});
      setModalVisible(false);
    }
  };

  return (
    <>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={2000.0}>
        {'Favor informe uma mesa não listada.'}
      </Snackbar>
      <View style={styles.container}>
        <View style={styles.container1}>
          <FlatList
            data={pedidos}
            keyExtractor={(pedido, index) => `list-index-${index}`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Info', {pedido: item});
                }}>
                <View style={styles.listMesa}>
                  <Text style={styles.addMesaButton}>Mesa {item.mesa}</Text>
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
              keyboardType="numeric"
              style={styles.inputMesa}
              placeholder="Digite uma nova mesa"
              value={mesa}
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
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
  container1: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  listMesa: {
    height: 100,
    width: 300,
    backgroundColor: '#353583',
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
