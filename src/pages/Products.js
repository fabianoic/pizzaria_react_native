//Pagina para listar produtos cadastrados que podem ser inseridos no pedido


import React, {useState, useEffect} from 'react';

import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Text, TextInput, Modal} from 'react-native-paper';

import api from '../services/api';

export default function Products({navigation}) {
  const [produtos, setProdutos] = useState({});
  const [qtd, setQtd] = useState('');
  const [item, setItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [pedido, setPedido] = useState({});

  useEffect(() => {
    console.log('Pedido ', navigation.getParam('pedido'));
    console.log(navigation.getParam('callbackAddItem'));

    api
      .get('produto/all')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleAdd = async e => {
    const response = await api
      .post('itempedido/', {
        produto: item,
        quantidade: qtd,
        pedido: navigation.getParam('pedido'),
      })
      .catch(error => {
        console.log(error);
      });

    if (response.status === 201) {
     // const callbackAddItem = navigation.getParam('callbackAddItem');

   //   console.log(callbackAddItem);
     // callbackAddItem(response.data);
      setModalVisible(false);
      navigation.navigate('Itens');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.container1}>
          <FlatList
            data={produtos}
            keyExtractor={(prod, index) => `list-index-${index}`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setItem(item);
                  setModalVisible(true);
                }}>
                <View style={styles.listaProdutos}>
                  <Text style={styles.addMesaButton}>{item.descricao}</Text>
                  <Text style={styles.addMesaButton}>R$ {item.preco}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <Modal
        style={styles.model}
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.labelMesa}>Item:</Text>
          <Text style={styles.labelMesa}>{item.descricao}</Text>
          <Text>__________________________________________</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.inputMesa}
            placeholder="Digite a quantidade"
            value={qtd}
            onChangeText={qtdItem => setQtd(qtdItem)}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              handleAdd();
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
  container: {
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 8,
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    width: '85%',
    height: 400,
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
    alignItems: 'center',
  },
  mesaButton: {
    backgroundColor: '#353583',
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
  listaProdutos: {
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
});
