import React, {Component, useState, useEffect} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import {DataTable} from 'react-native-paper';

import plus from '../assets/plus.png';

import api from '../services/api';

export function navigationOptions({navigation}) {
  return {
    headerRight: (
      <TouchableOpacity
        style={styles.image}
        onPress={() => navigation.navigate('New')}>
        <Image source={plus} />
      </TouchableOpacity>
    ),
  };
}

export default function Filter({}) {
  const [pedidos, setPedidos] = useState([]);

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

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Mesa</DataTable.Title>
        <DataTable.Title>Total</DataTable.Title>
      </DataTable.Header>
      <FlatList
        data={this.state.pedidos}
        keyExtractor={pedido => pedido.id}
        renderItem={({item}) => (
          <DataTable.Row>
            <DataTable.Cell>{item.mesa}</DataTable.Cell>
            <DataTable.Cell>{item.valorTotal}</DataTable.Cell>
          </DataTable.Row>
        )}
      />
    </DataTable>
  );
}

// import { Container } from './styles';
export default class Filter extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: (
      <TouchableOpacity
        style={styles.image}
        onPress={() => navigation.navigate('New')}>
        <Image source={plus} />
      </TouchableOpacity>
    ),
  });

  state = {
    pedidos: [],
  };

  async componentDidMount() {
    const response = await api.get('/all');
    this.setState({pedidos: response.data});
  }

  render() {
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Mesa</DataTable.Title>
          <DataTable.Title>Total</DataTable.Title>
        </DataTable.Header>
        <FlatList
          data={this.state.pedidos}
          keyExtractor={pedido => pedido.id}
          renderItem={({item}) => (
            <DataTable.Row>
              <DataTable.Cell>{item.mesa}</DataTable.Cell>
              <DataTable.Cell>{item.valorTotal}</DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    marginRight: 20,
  },
});
