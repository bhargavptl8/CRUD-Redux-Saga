export const INFODATAFETCH = 'INFODATAFETCH';
export const INFODATASUCCESS = 'INFODATASUCCESS';

export const dataFetch = (data) => ({ type : INFODATAFETCH, payload : data})
export const dataSuccess = (data) => ({ type : INFODATASUCCESS, payload : data})
