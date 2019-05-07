import * as http from './http';

export const sync = () => http.get('/trades');

export const insert = (data) => http.post('/user', data);

export const login = (data) => http.post('/auth/login', data);

export const remove = (data) => http.del(`/trade`, data);

export const update = (data) => http.put(`/trade`, data, data._id);


