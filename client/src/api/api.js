import axios from 'axios';
//
const urlPersonal = 'http://localhost:4000/api/personal';
const urlIndicador = 'http://localhost:4000/api/indicadores';
const urlBoleta = 'http://localhost:4000/api/boleta';
const urlRegistro = 'http://localhost:4000/api/registro';
const urlConfiguracion = 'http://localhost:4000/api';

/*Peticiones a la Api usuarios*/
export const apiGetUserByCedula = (cedula) => axios.get(`${urlPersonal}/${cedula}`);
export const validarLogin = (datos) => axios.post(`${urlPersonal}Validar`, datos);
export const updateRegisterPersonal = (id, newData) => axios.put(`${urlPersonal}/${id}`, newData);
export const updatePasswordPersonal = (id, newPassword) => axios.put(`${urlPersonal}Password/${id}`, newPassword);

/*Peticiones a la Api indicadores*/
export const guardarIndicador = (indicador) => axios.post(urlIndicador, indicador);
export const indicadoresUserActivo = (usuario) => axios.post(`${urlIndicador}Usuario`, usuario);
export const updateIndicadorActivo = (id, indicador) => axios.put(`${urlIndicador}/${id}`, indicador);
export const emailCorrecciones = (comentario) => axios.post(`${urlIndicador}Email`, comentario);
export const eliminarIndicadorDB = (id) => axios.delete(`${urlIndicador}/${id}`);


/*Peticiones a la Api boleta*/

export const apiFiveStudents = (datos) => axios.post(`${urlBoleta}Estudiantes`, datos);
export const apiNextFiveStudents = (datos) => axios.post(`${urlBoleta}NextEstudiantes`, datos);
export const apiIndicadorlEspecialista = (datos) => axios.post(`${urlBoleta}Literal`, datos);
export const apiGenerarBoleta = (datosBoleta) => axios.post(`${urlBoleta}/crearBoleta`, datosBoleta);


/* Peticiones Registros de usuarios y estudiantes.  */

export const apiRegisterStudent = (datos) => axios.post(`${urlRegistro}Estudiante`, datos);
export const apiRegisterPersonal = (datos) => axios.post(`${urlRegistro}Usuario`, datos);
export const apiGetAllRegisters = (param) => axios.get(`${urlRegistro}Usuarios`, { params: { param } });
export const getStudentByCedula = (cedula) => axios.post(`${urlRegistro}Unico`, cedula);
export const apiUpdateStudent = (id, dataNew) => axios.put(`${urlRegistro}/${id}`, dataNew);
export const apiDeleteRegister = (id, nameTable) => axios.delete(`${urlRegistro}Eliminar/${id}`, { params: { tabla: nameTable } });


/* Peticiones configuración del sistema */

export const apiMateriasExistentes = () => axios.get(`${urlConfiguracion}/allMaterias`);  //Materias en la Bd.
export const apiAllStudents = () => axios.get(`${urlConfiguracion}/allStudents`);
export const apiRegistrarMaterias = (datos) => axios.post(`${urlConfiguracion}/savedMateria`, datos);
export const apiDeleteStudentsByGrado = (grado) => axios.delete(`${urlConfiguracion}/deleteByGrado/${grado}`);
export const apiDeleteAllStudents = () => axios.delete(`${urlConfiguracion}/truncateData`);

