import axios from 'axios';

const instance = axios.create({
  baseURL: `http://10.61.129.9:8080/x-sign`
});

export default instance;
