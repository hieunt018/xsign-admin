import axios from 'axios';
import { getToken, setToken, revokeToken } from '../utils/token';
import * as environment from '../environment/index';

const AUTHORIZATION_KEY = 'Authorization';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? `${environment.API_WEBSERVICE}/x-sign-admin-ws` : `http://171.244.173.203/x-sign-admin-ws`
});

instance.interceptors.request.use(
  async config => {
    const new_token = getToken();
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
      window.location.href = '/x-sign-admin/login';
      revokeToken();
    }
    return Promise.reject(error);
  }
);

export default instance;
