import * as http from './http';

export const sync = () => http.get('/trades');

export const insert = (data) => http.post('/trade', data);

export const remove = (data) => http.del(`/trade`, data);


