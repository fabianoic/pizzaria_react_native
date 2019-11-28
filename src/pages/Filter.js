import React, {useState, useEffect} from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

import {DataTable, Snackbar, Modal, Text, TextInput} from 'react-native-paper';

import plus from '../assets/plus.png';

import api from '../services/api';
import {gray} from 'ansi-colors';

export default function Filter({navigation}) {
  const [pedidos, setPedidos] = useState([]);
  const [mesa, setMesa] = useState('');
  const [snackVisible, setSnackVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api
      .get('/all')
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });

  const handleCreate = async e => {
    if (mesa === '') {
      setSnackVisible(true);
    } else {
      const response = await api
        .post('/', {
          mesa,
          itemPedido: [{}],
          valorTotal: 0.0,
        })
        .catch(error => {
          console.log(error);
        });
      if (response.status === 201) {
        setPedidos(pedidos);
      }
    }
  };
  return (
    <>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={3000.0}>
        Favor informe uma mesa.
      </Snackbar>
      <TouchableOpacity
        style={styles.mesaButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.addMesaButton}>Adicionar mesa</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.listMesa}>
          <Text>Mesa 2</Text>
        </View>
        <View style={styles.listMesa}>
          <Text>Mesa 3</Text>
        </View>
        <View style={styles.listMesa}>
          <Text>Mesa 4</Text>
        </View>
        <View style={styles.listMesa}>
          <Text>Mesa 5</Text>
        </View>
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
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(true);
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
  model: {zIndex: 1},
  modalView: {
    borderRadius: 8,
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    width: '85%',
    height: '75%',
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  listMesa: {
    height: 100,
    width: 100,
    backgroundColor: 'gray',
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 5,
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
