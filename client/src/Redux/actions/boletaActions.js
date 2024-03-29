import * as api from '../../api/api';
import types from '../types';
import { validarCampos } from '../../helpers/validarRegistros';
import { roles } from '../../helpers/roles';
import { alertAvisos, BoletaEnProcesoAlert } from '../../helpers/alerts';
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
                dispatch(textAreaAndFecha({ textArea: '', inicioMomento: '', finMomento: '', anioEscolar: '' }));
                dispatch(estudianteSelected({ nombres: '', grado: '', seccion: '', docente: '' }));
            }
        }

    } catch (err) { console.log(err.message) }
}

const conditionByCountAndButton = (btn) => {
    const nextBtn = document.getElementById('nextStudents');
    const backBtn = document.getElementById('backStudents');

    if (btn === 'next') {
        count += 5
        backBtn.style.display = 'initial';
        if (count + 5 >= studentsBySeccion) nextBtn.style.display = 'none';

    } else {
        count = count <= 5 ? 0 : count - 5;
        if (nextBtn.style.display === 'none') nextBtn.style.display = 'initial';  // condiciones individuales
        if (count === 0) backBtn.style.display = 'none'; // condiciones individules
    }
}


export const actionFiveStudentsButtons = (btn) => async (dispatch, getState) => { // btn => next or back
    try {
        conditionByCountAndButton(btn);

        const { grado, seccion } = getState().boleta.gradoSeccion;
        const sendSearch = { valorInicial: count, seccionSelected: seccion, gradoSelected: grado, }; //data de los parametros.

        const { data } = await api.apiButtonsFiveStudents(sendSearch);

        dispatch({ type: types.nextOrBackFiveStudents, payload: { data: data[0], boletasPendientes: data[1] } });
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

        const materiasDocente = data.filter(materia => materia.tipo === roles.docente);
        const materiasEspecialista = data.filter(materia => materia.tipo === roles.especialista);

        dispatch({ type: types.materiasTypes, payload: { materiasDocente, materiasEspecialista } });
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



export const guardarBoletaAction = (historyPush) => async (dispatch, getState) => {
    const dataBoleta = getState().boleta;
    const totalMateriasByGrado = dataBoleta.materiasWithIndicadores.filter(area => area.indicadores.length >= 1);
    /*De todas las materias de tipo Docente, filtrar solo las que el docente está usando, 
   ya que los docentes de grados diferentes no usarán las mismas materias. */
    if (dataBoleta.literalIndicadoresDocentes.length < totalMateriasByGrado.length) {
        alertAvisos('Faltan áreas de docente* por completar');

    } else {
        BoletaEnProcesoAlert();
        const check = dataBoleta.boletasPendientesBySeccion <= 1;

        const { data } = await api.apiGenerarBoleta({
            indicadoresByArea: dataBoleta.literalIndicadoresDocentes,
            literalesEspecialistas: dataBoleta.literalesEspecialistas,
            momento: dataBoleta.momento,
            descripAndDate: dataBoleta.descripAndDate,
            studentSelected: dataBoleta.studentSelected,
            personalFirmas: dataBoleta.personalFirmas,
            fecha_de_creacion: new Date().toLocaleDateString(),
            boletasPendientesBySeccion: dataBoleta.boletasPendientesBySeccion
        });

        dispatch({ type: types.savedBoletaTypes, payload: { id: dataBoleta.studentSelected.id } });

        downloandBoletaAndMsgSuccess(check, data, dataBoleta.studentSelected.nombres);
        historyPush.push('/menu-principal/creacion-de-boletas');
    }
}


//const uidUser = getState().auth.uid   

