import axios from 'axios';
import * as environment from '../environment/index';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? `${environment.API_WEBSERVICE}/x-sign-admin-ws` : `/x-sign-admin-ws`
});

export const login = (requestBody) => {
    return instance.post('/login', requestBody);
};