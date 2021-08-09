import axios from 'axios';
//
const urlPersonal = 'http://localhost:4000/api/personal';
const urlIndicador = 'http://localhost:4000/api/indicadores';
const urlBoleta = 'http://localhost:4000/api/boleta';
const urlRegistro = 'http://localhost:4000/api/registro';

/*Peticiones a la Api usuarios*/
export const getPasswordUser = ( id ) => axios.get( `${urlBoleta}/${id}` );
export const validarLogin = ( datos ) => axios.post( `${urlPersonal}Validar`, datos );
export const updateRegisterPersonal = ( id, newData ) => axios.put( `${urlPersonal}/${id}`, newData);
export const updatePasswordPersonal = ( id, newPassword ) => axios.put( `${urlPersonal}Password/${id}`, newPassword);

/*Peticiones a la Api indicadores*/
export const guardarIndicador = (indicador) => axios.post(urlIndicador, indicador);
export const indicadoresUserActivo = (usuario) => axios.post( `${urlIndicador}Usuario`, usuario);
export const updateIndicadorActivo = ( id, indicador ) => axios.put(`${urlIndicador}/${id}`, indicador);
export const emailCorrecciones = ( comentario ) => axios.post(`${urlIndicador}Email`, comentario);
export const eliminarIndicadorDB = ( id ) => axios.delete(`${urlIndicador}/${id}`);
export const apiMateriasExistentes = () => axios.get(`${urlBoleta}Materias`);  //Materias en la Bd.
  

/*Peticiones a la Api boleta*/   

export const apiFiveStudents = ( datos ) => axios.post( `${urlBoleta}Estudiantes`, datos );
export const apiNextFiveStudents = ( datos ) => axios.post( `${urlBoleta}NextEstudiantes`, datos );
export const apiIndicadorlEspecialista = (datos) => axios.post(`${urlBoleta}Literal`, datos );


/* Peticiones Registros de usuarios y estudiantes.  */

export const apiRegisterStudent = (datos) => axios.post(`${urlRegistro}Estudiante`, datos);
export const apiRegisterPersonal = (datos) => axios.post(`${urlRegistro}Usuario`, datos);
export const apiGetAllRegisters = (param) => axios.get(`${urlRegistro}Usuarios`, { params: { param }});
export const getStudentByCedula = ( cedula ) => axios.post(`${urlRegistro}Unico`, cedula);
export const updateStudent = (id, dataNew) => axios.put( `${urlRegistro}/${id}`, dataNew );
export const apiDeleteRegister = (id, nameTable) => axios.delete(`${urlRegistro}Eliminar/${id}`, { params: { tabla: nameTable}});
 

