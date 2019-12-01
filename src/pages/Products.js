import React, {useState, useEffect} from 'react';

import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Text} from 'react-native-paper';

import api from '../services/api';

export default function Products({navigation}) {
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({});
  const [pedido, setPedido] = useState({});

  const handleCreate = async e => {
    const response = await api
      .put(`pedido/${navigation.getParam('id')}`, {
        ...pedido,
        itemPedido: {produto},
      })
      .catch(error => {});
    if (response.status !== null && response.status === 201) {
      navigation.navigate('ItemProduct', response.data);
    }
  };

  useEffect(() => {
    api
      .get('produto/all')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    api.get(`pedido/${navigation.getParam('id')}`).then(response => {
      setPedido(response.data);
    });
  });

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={produtos}
          keyExtractor={(prod, index) => `list-index-${index}`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setProduto(item);
                handleCreate();
              }}>
              <View style={styles.listaProdutos}>
                <Text>{item.descricao}</Text>
                <Text>R${item.preco}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  listaProdutos: {
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
});
