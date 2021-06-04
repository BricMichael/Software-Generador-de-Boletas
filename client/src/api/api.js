import axios from 'axios';

const url = 'http://localhost:4000/api/personal';

export const usuariosDataBase = () => axios.get(url);