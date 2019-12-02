import React, {useEffect, useState} from 'react';

import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

import api from '../services/api';

// import { Container } from './styles';

export default function Info({navigation}) {
  const [pedido, setPedido] = useState({});
  const [usuario, setUsuario] = useState({});
  useEffect(() => {
    api
      .get(`pedido/${navigation.getParam('id')}`)
      .then(response => {
        setPedido(response.data);
        setUsuario(response.data.usuario);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Id: </Text>
      <View style={styles.backgrounditem}>
        <Text style={styles.item}>{pedido.id}</Text>
      </View>
      <Text style={styles.label}>Mesa: </Text>
      <View style={styles.backgrounditem}>
        <Text style={styles.item}>{pedido.mesa}</Text>
      </View>
      <Text style={styles.label}>Data de criação: </Text>
      <View style={styles.backgrounditem}>
        <Text style={styles.item}>{pedido.dataCriacao}</Text>
      </View>
      <Text style={styles.label}>Usuário: </Text>
      <View style={styles.backgrounditem}>
        <Text style={styles.item}>{usuario.nome}</Text>
      </View>
      <Text style={styles.label}>Total: </Text>
      <View style={styles.backgrounditem}>
        <Text style={styles.item}>R$ {pedido.valorTotal}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  label: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  item: {marginHorizontal: 30, fontSize: 20, color: 'white'},
  backgrounditem: {
    backgroundColor: '#353583',
    opacity: 1,
    borderRadius: 4,
  },
});
