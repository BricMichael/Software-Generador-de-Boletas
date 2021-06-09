import axios from 'axios';

const url = 'http://localhost:4000/api/personal';

export const usuariosDataBase = () => axios.get(url);
export const validarLogin = ( datos ) => axios.post(`${url}Validar`, datos );
