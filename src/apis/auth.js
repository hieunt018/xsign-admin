import axios from 'axios';
import * as environment from '../environment/index';

const instance = axios.create({
    baseURL: `${environment.API_WEBSERVICE}/x-sign`
});

export const login = (requestBody) => {
    return instance.post('/login', requestBody);
};
