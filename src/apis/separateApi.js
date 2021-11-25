import axios from 'axios';
import { getToken, setToken, revokeToken } from '../utils/token'

const AUTHORIZATION_KEY = 'Authorization';

const instance = axios.create({
  baseURL: `http://10.61.129.9:8080/x-sign`
});

instance.interceptors.request.use(
  async config => {
    const new_token = getToken();
    console.log('new token', new_token)
    if (new_token) setToken(new_token);
    config.headers[AUTHORIZATION_KEY] = `${new_token}`;

    return config;
  },
  error => {
    console.error(error)
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      instance.defaults.headers.common[
        AUTHORIZATION_KEY
      ] = `${response.data.token}`;
    }
    return response;
  },
  (error) => {
    //Revoke token if authorization fail.
    if (error.response?.status === 401) {
      window.location.href = '/login';
      revokeToken();
    }
    return Promise.reject(error);
  }
);

export default instance;
