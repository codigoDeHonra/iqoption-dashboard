import * as http from './http';


export const t = (path, queryParams = '') => http.get(`${path}${queryParams}`);

export const insertTrade = (path, queryParams = '') => http.get(`${path}${queryParams}`);

