import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {Text} from 'react-native-paper';

import plus from '../assets/plus1.png';
import api from '../services/api';

export function navigationOptionsItemProductScreen({navigation}) {
  const id = navigation.getParam('id');
  return {
    headerRight: (
      <TouchableOpacity
        style={styles.image}
        onPress={() => navigation.navigate('Products', id)}>
        <Image source={plus} />
      </TouchableOpacity>
    ),
  };
}

export default function ItemProduct({navigation}) {
  const [pedido, setPedido] = useState({});
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    navigation.setParams({pedido});
    api
      .get(`pedido/${navigation.getParam('id')}`)
      .then(response => {
        setPedido(response.data);
        setProdutos(response.data.itemPedido);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.container1}>
          <FlatList
            data={produtos}
            keyExtractor={(prod, index) => `list-index-${index}`}
            renderItem={({item}) => (
              <View style={styles.listaProdutos}>
                <Text style={styles.addMesaButton}>
                  {item.produto.descricao}
                </Text>
                <Text style={styles.addMesaButton}>
                  Quantidade: {item.quantidade}
                </Text>
                <Text style={styles.addMesaButton}>
                  R$ {item.produto.preco * item.quantidade}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    marginRight: 20,
  },
  container1: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingHorizontal: 5,
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
});
