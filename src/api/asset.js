import * as http from './http';

export const sync = (data) => http.get('/asset', data);

export const insert = (data) => http.post('/asset', data);

export const remove = (id) => http.del(`/asset`, id);

export const update = (data) => http.put(`/asset`, data, data._id);
