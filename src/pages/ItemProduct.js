//Pagina para listar itens que foram inseridos no pedido
import React, {useState, useEffect} from 'react';
import {NavigationEvents} from 'react-navigation';
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
  const pedido = navigation.getParam('pedido');
  const callbackAddItem = navigation.getParam('cb');

  console.log('NAVIGATIONOPTIONS', callbackAddItem);

  return {
    headerRight: (
      <TouchableOpacity
        style={styles.image}
        onPress={() =>
          navigation.navigate('Products', {pedido, callbackAddItem})
        }>
        <Image source={plus} />
      </TouchableOpacity>
    ),
  };
}

export default function ItemProduct({navigation}) {
  const [produtos, setProdutos] = useState([]);

  function callbackAddItem(item) {
    setProdutos({
      ...produtos,
      item,
    });
  }

  const atualizaPedido = () => {
    const pedido = navigation.getParam('pedido');

    api
      .get(`pedido/${pedido.id}`)
      .then(response => {
        setProdutos(response.data.itemPedido);
        console.log('Pedido API', response.data);
        navigation.setParams({pedido: response.data, cb: callbackAddItem});
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log('CHAMOU USE EFFECT');
    atualizaPedido();
  }, []);

  return (
    <>
      <NavigationEvents onWillFocus={payload => atualizaPedido()} />
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
