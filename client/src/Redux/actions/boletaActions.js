import * as api from '../../api/api';
import types from '../types';
import { validarCampos } from '../../helpers/validarRegistros';
import { roles } from '../../helpers/roles';



let count = 0;
let studentsBySeccion = 0;

const eachRender = () => { // esta funcion se ejecuta cada que se cambie de grado o seccion.
    count = 0;  // inicializar el contador en 0 cada que se cambie de grado o seccion.
    document.getElementById('backStudents').style.display = 'none';
    document.getElementById('nextStudents').style.display = 'initial';
}

export const listFiveStudents = ({ seccion, grado }) => async (dispatch, getState) => {
    const respError = validarCampos({ seccion, grado })
    try {
        if (respError === 'excelente') {
            const { data } = await api.apiListFiveStudents({ seccionSelected: seccion, gradoSelected: grado, });
            dispatch({ type: types.fiveStudents, payload: { data: data[0], grado, seccion } });
            eachRender();
            studentsBySeccion = data[1]; // total de estuidantes por seccion.

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
        if (nextBtn.style.display === 'none') nextBtn.style.display = 'initial';  // condiciones individules
        if (count === 0) backBtn.style.display = 'none'; // condiciones individules
    }
}


export const actionFiveStudentsButtons = (btn) => async (dispatch, getState) => { // btn => next or back
    try {
        conditionByCountAndButton(btn);

        const { grado, seccion } = getState().boleta.gradoSeccion;
        const sendSearch = { valorInicial: count, seccionSelected: seccion, gradoSelected: grado, }; //data de los parametros.

        const { data } = await api.apiButtonsFiveStudents(sendSearch);

        dispatch({ type: types.nextOrBackFiveStudents, payload: data });
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
    const { momento } = getState().boleta;
    const { data } = await api.apiIndicadorlEspecialista({ grado, area, momento });

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



export const guardarBoletaAction = () => async (dispatch, getState) => {
    const dataBoleta = getState().boleta;


    console.log('se fue la data al backend')
    const { data } = await api.apiGenerarBoleta({
        indicadoresByArea: dataBoleta.literalIndicadoresDocentes,
        literalesEspecialistas: dataBoleta.literalesEspecialistas,
        momento: dataBoleta.momento,
        descripAndDate: dataBoleta.descripAndDate,
        studentSelected: dataBoleta.studentSelected,
        personalFirmas: dataBoleta.personalFirmas
    });

    console.log('llegon response del backend =>>> ', data)

}



//const uidUser = getState().auth.uid 

//  dispatch({
//         type: types.savedBoletaTypes,
//         payload: data
//     })
//     Swal.fire({ title: 'La boleta ha sido creada',
//     text: 'Espere unos segundos...',
//     icon: 'success',
//     showConfirmButton: false,
//     timer: 1600,
//     timerProgressBar: true,
//     })
//     Swal.showLoading()
