import * as http from './http';

export const sync = (data) => http.get('/wallet', data);

export const insert = (data) => http.post('/wallet', data);

export const remove = (id) => http.del(`/wallet`, id);

export const update = (data) => http.put(`/wallet`, data, data._id);
