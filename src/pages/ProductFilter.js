import React, {useState, useEffect} from 'react';

import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Snackbar, Modal, Text, TextInput} from 'react-native-paper';

import api from '../services/api';

export default function ProductFilter({navigation}) {
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({});

  useEffect(() => {
    api
      .get('produto/all')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.log(error);
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
                navigation.goBack();
                console.log(item);
              }}>
              <View style={styles.listaProdutos}>
                <Text>{item.descricao}</Text>
                <Text>{item.preco}</Text>
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
