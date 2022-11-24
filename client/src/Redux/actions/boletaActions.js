import * as api from '../../api/api';
import types from '../types';
import { validarCampos } from '../../helpers/validarRegistros';
import { roles } from '../../helpers/roles';
import { alertAvisos, boletaGeneradaAlert } from '../../helpers/alerts';
import { downloandBoletaAndMsgSuccess } from '../../helpers/creacionBoleta';



let count = 0;
let studentsBySeccion = 0;

const eachRender = () => { // esta funcion se ejecuta cada que se cambie de grado o seccion.
    count = 0;  // inicializar el contador en 0 al cmbiar de grado o seccion.
    document.getElementById('backStudents').style.display = 'none';
    document.getElementById('nextStudents').style.display = 'initial';
}

export const listFiveStudents = ({ seccion, grado }) => async (dispatch, getState) => {
    const respError = validarCampos({ seccion, grado })
    try {
        if (respError === 'excelente') {
            const { data } = await api.apiListFiveStudents({ seccionSelected: seccion, gradoSelected: grado, });
            dispatch({ type: types.fiveStudents, payload: { data: data[0], grado, seccion, boletasPendientes: data[2] } });
            eachRender();
            studentsBySeccion = data[1]; // total de estudiantes por seccion.
            const nameDatos = getState().boleta.studentSelected.nombres;
            if (nameDatos !== '') {// reset data del estudiante seleccionado y las fechas,al cambiar de grado o seccion
                dispatch(textAreaAndFecha({ inicioMomento: '', finMomento: '', anioEscolar: '' }));
                dispatch(estudianteSelected({ nombres: '', grado: '', seccion: '', docente: '' }));
            }
        }

    } catch (err) { console.log(err.message) }
}

const conditionByCountAndButton = (btn, hayDatos) => {
    const nextBtn = document.getElementById('nextStudents');
    const backBtn = document.getElementById('backStudents');

    if( hayDatos ) {
        if (btn === 'next') {
            count += 5;
            backBtn.style.display = 'initial';
            if (count + 5 >= studentsBySeccion) nextBtn.style.display = 'none';
        } else {
            count = count <= 5 ? 0 : count - 5;
            if (nextBtn.style.display === 'none') nextBtn.style.display = 'initial';  // condiciones individuales
            if (count === 0) backBtn.style.display = 'none'; // condiciones individules
        }
    } else {
        if (btn === 'next') {
            count = count <= 5 ? 5 : count;
        }
        else {
            count = count < 5 ? 0 : count === 5 ? 5 : count - 10;
        }
    }
}


export const actionFiveStudentsButtons = (btn) => async (dispatch, getState) => { // btn => next or back
    try {        
        conditionByCountAndButton(btn, false);
        const { grado, seccion } = getState().boleta.gradoSeccion;
        const sendSearch = { valorInicial: count, seccionSelected: seccion, gradoSelected: grado, }; //data de los parametros.

        const { data } = await api.apiButtonsFiveStudents(sendSearch);
        if ( data[0].length ) {
            dispatch({ type: types.nextOrBackFiveStudents, payload: { data: data[0], boletasPendientes: data[1] } });
            conditionByCountAndButton(btn, data[0].length > 0);
        }
    } catch (err) {
        console.log(err.message);
    }

}


export const estudianteSelected = (estudiante) => ({ type: types.studentSelected, payload: estudiante });

export const textAreaAndFecha = (datos) => ({ type: types.textAreaAndDate, payload: datos });

export const getAndSetFirmasPersonal = () => async (dispatch) => {
    const { data } = await api.apiGetNameFirmasPersonal();
    dispatch({ type: types.nameUsersFirmas, payload: data });
}

export const materiasExistentes = () => async (dispatch) => {
    try {
        const { data } = await api.apiMateriasExistentes();

        const materiasDocente = data.filter(materia => materia.tipo.toLowerCase() === roles.docente);
        const materiasEspecialista = data.filter(materia => materia.tipo.toLowerCase() === roles.especialista);

        dispatch({ type: types.materiasTypes, payload: { materiasDocente, materiasEspecialista } });
    } catch (err) {
        console.log(err.message);
    }
}

export const handleEstadoMateriaAction = (materia) => async (dispatch) => {
    try {
        await api.apiEstadoMateria({ estado: !materia.estado, idMateria: materia.id});
        dispatch({ type: types.materiaEstado, payload: materia });
    } catch (err) {
        console.log(err.message);
    }
}


export const indicadorEspecialistaByArea = (grado, area, setLiteralIndicadorByArea) => async (dispatch, getState) => {
    const { momento, anioIndicadores } = getState().boleta;
    const { data } = await api.apiIndicadorlEspecialista({ grado, area, momento, anioIndicadores });

    setLiteralIndicadorByArea({ IndicadorByArea: data, literalSelected: {} });
}


export const setLiteralEspecialista = (indicador) => ({
    type: types.setLiteralEspecialista,
    payload: indicador
})

export const literalesByAreaDocente = (indicadoresWithLiteralByArea) => ({
    type: types.indicadorLiteralDocente,
    payload: indicadoresWithLiteralByArea
});

export const botonCleanData = () => ({ type: types.botonResetState });



export const guardarBoletaAction = (indicadoresBoleta) => async (dispatch, getState) => {
    const userLogeado = JSON.parse(localStorage.getItem('userActive'));

    const studentSelected = getState().boleta.studentSelected;
    const date = getState().boleta.descripAndDate;

    const character = date.anioEscolar.indexOf('-');
    let convertAnioEscolar = '';

    if (character === -1) { // asegurarme de que el año escolar fue escrito con guión (-) y no con barra (/).
        convertAnioEscolar = `${date.anioEscolar.slice(0, 4)}-${date.anioEscolar.slice(5, 9)}`; // convert to 2022-2023
    }
 
    const { data } = await api.apiGenerarBoleta({
        anio_escolar:  convertAnioEscolar ? convertAnioEscolar : date.anioEscolar,
        grado: studentSelected.grado,
        seccion: studentSelected.seccion,
        cedula_estudiante: studentSelected.cedula_escolar,
        momento: date.momento,
        especialidad: userLogeado.especialidad,
        nombre_estudiante: studentSelected.nombres,
        mes_momento_inicio: date.inicioMomento,
        mes_momento_fin: date.finMomento,
        rolPersonal: userLogeado.rol,
        indicadores: indicadoresBoleta,
        observacion: date.observacion
    });
    boletaGeneradaAlert(data.mensaje);
    console.log(data);
    // dispatch({ type: types.savedBoletaTypes, payload: { id: dataBoleta.studentSelected.id } });
}


//const uidUser = getState().auth.uid   

