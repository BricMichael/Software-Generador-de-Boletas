import axios from 'axios';

const urlPersonal = 'http://localhost:4000/api/personal';
const urlIndicador = 'http://localhost:4000/api/indicadores';

export const usuariosDataBase = () => axios.get(urlPersonal);
export const validarLogin = ( datos ) => axios.post(`${urlPersonal}Validar`, datos );



export const guardarIndicador = (indicador) => axios.post(urlIndicador, indicador);
export const indicadoresUserActivo = (usuario) => axios.post(`${urlIndicador}Usuario`, usuario);
export const updateIndicadorActivo = ( id, indicador ) => axios.put(`${urlIndicador}/${id}`, indicador);

export const eliminarIndicadorDB = ( id ) => axios.delete(`${urlIndicador}/${id}`);
  

   

 
