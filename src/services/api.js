import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.0.4:8080/rest/',
});

api.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {}
});

export default api;
/*
const response = await api.post('/user/login', {
  usuario: 'fabiano',
  senha: 'fabiano',
});

if (response.status === 200) {
  await AsyncStorage.setItem('token', response.data.token);
  await AsyncStorage.setItem('usuarioLogado', response.data.user);
}*/

// salvar o token ao fazer o login
//await AsyncStorage.setItem('token', response.data.token);

// na tela de login, tu manda usuario e senha via POST e se o login for bem sucedido, tu vai receber os dados do usuario
// logado e um token de autorização e vai salvar esse token na memoria do celular com o AsyncStorage (await AsyncStorage.setItem('token', response.data.token))

// service de api, já carrega esse token da memoria e inclui nos headers automaticamente quando estiver instanciando o cliente do axios
