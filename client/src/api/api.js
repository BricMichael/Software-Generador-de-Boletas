import axios from 'axios';

const urlPersonal = 'http://localhost:4000/api/personal';
const urlIndicador = 'http://localhost:4000/api/indicadores';
const urlBoleta = 'http://localhost:4000/api/boleta';

/*Peticiones a la Api usuarios*/
export const usuariosDataBase = () => axios.get(urlPersonal);
export const validarLogin = ( datos ) => axios.post(`${urlPersonal}Validar`, datos );


/*Peticiones a la Api indicadores*/
export const guardarIndicador = (indicador) => axios.post(urlIndicador, indicador);
export const indicadoresUserActivo = (usuario) => axios.post(`${urlIndicador}Usuario`, usuario);
export const updateIndicadorActivo = ( id, indicador ) => axios.put(`${urlIndicador}/${id}`, indicador);
export const emailCorrecciones = ( comentario ) => axios.post(`${urlIndicador}Email`, comentario);
export const eliminarIndicadorDB = ( id ) => axios.delete(`${urlIndicador}/${id}`);
export const apiMateriasExistentes = () => axios.get(`${urlBoleta}Materias`);  //Materias en la Bd.
  

/*Peticiones a la Api boleta*/   

export const apiFiveStudents = ( datos ) => axios.post( `${urlBoleta}Estudiantes`, datos );
export const apiNextFiveStudents = ( datos ) => axios.post( `${urlBoleta}NextEstudiantes`, datos );
export const apiIndicadorlEspecialista = (datos) => axios.post(`${urlBoleta}Literal`, datos );

 
