import axios from 'axios';

const api = axios.create({
  //alterar IP para o ip da maquina, localhost não funciona
  baseURL: 'http://192.168.0.7:8080/rest/',
});

export default api;
