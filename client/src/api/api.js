import axios from 'axios';

const API_URL = 'http://localhost:4000/';
const urlPersonal = `${API_URL}api/personal`;
const urlIndicador = `${API_URL}api/indicadores`;
const urlBoleta = `${API_URL}api/boleta`;
const urlRegistro = `${API_URL}api/registro`;
const urlConfiguracion = `${API_URL}api/config/`;

/*Peticiones a la Api usuarios*/
export const apiGetUsers = (component) => axios.get(`${urlPersonal}/${component}`);
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

export const apiListFiveStudents = (datos) => axios.post(`${urlBoleta}Estudiantes`, datos);
export const apiButtonsFiveStudents = (datos) => axios.post(`${urlBoleta}ShowEstudiantes`, datos);
export const apiGetNameFirmasPersonal = () => axios.get(`${urlBoleta}/firmasPersonal`);
export const apiIndicadorlEspecialista = (datos) => axios.post(`${urlBoleta}Literal`, datos);
export const apiGenerarBoleta = (datosBoleta) => axios.post(`${urlBoleta}/crearBoleta`, datosBoleta);
export const apiGetBoletaByCedulaAndMomento = (datos) => axios.post(`${urlBoleta}/existente`, datos);
export const apiGenerarBoletaExistente = (datos) => axios.post(`${urlBoleta}/existente`, datos, { responseType: 'blob' });
export const apiEliminarBoleta = (datos) => axios.post(`${urlBoleta}/deleteBoleta`, datos);
export const apiEliminarAllBoletas = (datos) => axios.post(`${urlBoleta}/deleteBoletas`, datos);


/* Peticiones Registros de usuarios y estudiantes.  */
export const apiRegisterStudent = (datos) => axios.post(`${urlRegistro}Estudiante`, datos);
export const apiRegisterPersonal = (datos) => axios.post(`${urlRegistro}Usuario`, datos);
export const apiGetAllRegisters = (param) => axios.get(`${urlRegistro}Usuarios`, { params: { param } });
export const getStudentByCedula = (cedula) => axios.post(`${urlRegistro}Student`, cedula);
export const apiUpdateStudent = (id, dataNew) => axios.put(`${urlRegistro}/${id}`, dataNew);
export const apiDeleteRegister = (id, nameTable) => axios.delete(`${urlRegistro}Eliminar/${id}`, { params: { tabla: nameTable } });


/* Peticiones configuración del sistema */
export const apiMateriasExistentes = () => axios.get(`${urlConfiguracion}allMaterias`);  //Materias en la Bd.
export const apiEstadoMateria = (materia) => axios.put(`${urlConfiguracion}estadoMateria`, materia);  //Materias en la Bd.
export const apiTotalUsersByRol = () => axios.get(`${urlConfiguracion}totalUserByRol`);
export const apiAllStudents = () => axios.get(`${urlConfiguracion}allStudents`);
export const apiRegistrarMaterias = (datos) => axios.post(`${urlConfiguracion}savedMateria`, datos);
export const apiDeleteStudentsByGrado = (grado) => axios.delete(`${urlConfiguracion}deleteByGrado/${grado}`);
export const apiDeleteAllStudents = () => axios.delete(`${urlConfiguracion}truncateData`);

