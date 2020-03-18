import * as http from './http';

export const sync = (data) => http.get('/category', data);

export const insert = (data) => http.post('/category', data);

export const remove = (id) => http.del(`/category`, id);

export const update = (data) => http.put(`/category`, data, data._id);
