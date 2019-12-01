import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {Text} from 'react-native-paper';

import api from '../services/api';

export default function ItemProduct({navigation}) {
  const [pedido, setPedido] = useState({});
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api
      .get(`pedido/${navigation.getParam('id')}`)
      .then(response => {
        setPedido(response.data);
        setProdutos(response.data.itemPedido);
      })
      .catch(error => {
        console.log(error);
      });
  });

  return (
    <>
      <TouchableOpacity
        style={styles.mesaButton}
        onPress={() => {
          navigation.navigate('Products', pedido);
        }}>
        <Text style={styles.addMesaButton}>Adicionar item</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          data={produtos}
          keyExtractor={(prod, index) => `list-index-${index}`}
          renderItem={({item}) => (
            <View style={styles.listaProdutos}>
              <Text>teste</Text>
            </View>
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

//<Text>{item.descricao}</Text>
//<Text>{item.preco}</Text>
