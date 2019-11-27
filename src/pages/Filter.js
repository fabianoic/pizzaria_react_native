import React, {useState, useEffect} from 'react';

import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {DataTable, TextInput, Snackbar} from 'react-native-paper';

import api from '../services/api';

export default function Filter({}) {
  const [pedidos, setPedidos] = useState([]);
  const [mesa, setMesa] = useState('');
  const [visible, setVisible] = useState(false);

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
      setVisible(true);
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
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000.0}>
        Favor informe uma mesa.
      </Snackbar>

      <View style={styles.container}>
        <TextInput
          style={styles.mesa}
          placeholder="Digite uma mesa - não listada"
          value={mesa}
          onChangeText={() => setMesa({mesa})}
        />
        <TouchableOpacity
          style={styles.mesaButton}
          onPress={() => {
            handleCreate();
          }}>
          <Text style={styles.mesaButtonText}>Adicionar</Text>
        </TouchableOpacity>
        <Text />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Id</DataTable.Title>
            <DataTable.Title>Mesa</DataTable.Title>
            <DataTable.Title>Total</DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={pedidos}
            keyExtractor={pedido => pedido.toString()}
            renderItem={({item}) => (
              <DataTable.Row>
                <DataTable.Cell>{item.id}</DataTable.Cell>
                <DataTable.Cell>{item.mesa}</DataTable.Cell>
                <DataTable.Cell>{item.valorTotal}</DataTable.Cell>
              </DataTable.Row>
            )}
          />
        </DataTable>
      </View>
    </>
  );
}

// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  mesa: {
    marginBottom: 10,
    borderRadius: 4,
  },
  mesaButton: {
    backgroundColor: '#4682B4',
    borderRadius: 4,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mesaButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});
