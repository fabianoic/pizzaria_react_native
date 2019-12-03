import React, {useState} from 'react';

import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {Snackbar, Modal, Text, TextInput} from 'react-native-paper';

import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({navigation}) {
  const [snackVisible, setSnackVisible] = useState(false);
  const [senha, setSenha] = useState('');
  const [login, setLogin] = useState('');

  const handleLogin = async e => {
    const response = await api.post('usuario/login', {
      login,
      senha,
    });

    if (response.status === 200) {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('usuarioLogado', {
        usuarioLogado: response.data.user,
      });
      navigation.navigate('Filter');
    }
    if (response.status === 400) {
      setSnackVisible(true);
    }
  };

  return (
    <>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={2000.0}>
        {'Credenciais incorretas'}
      </Snackbar>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.labelMesa}>Login </Text>
          <Text>__________________________________________</Text>
          <TextInput
            style={styles.inputMesa}
            placeholder="Digite seu login"
            value={login}
            onChangeText={lg => setLogin(lg)}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.inputMesa}
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={psswd => setSenha(psswd)}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              handleLogin();
            }}>
            <Text style={styles.addMesaButton}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    height: 300,
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
  },
  listMesa: {
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
