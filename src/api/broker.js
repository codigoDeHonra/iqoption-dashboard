import * as http from './http';

export const sync = (data) => http.get('/broker', data);

export const insert = (data) => http.post('/broker', data);

export const remove = (id) => http.del(`/broker`, id);

export const update = (data) => http.put(`/broker`, data, data._id);
