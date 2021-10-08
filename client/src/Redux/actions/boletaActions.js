import * as api from '../../api/api';
import types from '../types';
import Swal from 'sweetalert2';
import { validarCampos } from '../../helpers/validarRegistros';
import { roles } from '../../helpers/roles';



let count = 5;

export const listFiveStudents = ({ seccion, grado }) => async (dispatch, getState) => {

    try {
        const respError = validarCampos({ seccion, grado })
        if (respError === 'excelente') {
            const sendSearch = { seccionSelected: seccion, gradoSelected: grado, } //data parametros.
            const { data } = await api.apiFiveStudents(sendSearch);
            dispatch({ type: types.fiveStudents, payload: { data, grado, seccion } });

            const nameDatos = getState().boleta.studentSelected.nombres;
            if (nameDatos !== '') {// reset data del estudiante seleccionado y las fechas,al cambiar de grado o seccion
                dispatch(textAreaAndFecha({ textArea: '', inicioMomento: '', finMomento: '', anioEscolar: '' }));
                dispatch(estudianteSelected({ nombres: '', grado: '', seccion: '', docente: '' }));
            }
            count = 5; // reinicia la variable nuevamente a 5 cada que se busque estudiantes.
        }

    } catch (err) { console.log(err.message) }
}


export const nextFiveStudents = () => async (dispatch, getState) => {
    try {
        const { grado, seccion } = getState().boleta.gradoSeccion;
        const sendSearch = { valorInicial: count, seccionSelected: seccion, gradoSelected: grado, }; //data de los parametros.
        const { data } = await api.apiNextFiveStudents(sendSearch);

        dispatch({ type: types.nextFiveStudents, payload: data });
        count += 5;

    } catch (err) {
        console.log(err.message);
    }

}


export const estudianteSelected = (estudiante) => ({ type: types.studentSelected, payload: estudiante });

export const textAreaAndFecha = (datos) => ({ type: types.textAreaAndDate, payload: datos });



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


export const updateLiteralOfIndicador = (id, literal) => ({
    type: types.updateLiteralDocente,
    payload: { id, literal }
})


export const setLiteralEspecialista = (indicador) => {
    return {
        type: types.setLiteralEspecialista,
        payload: { indicador }
    }
}


export const botonCleanData = () => ({ type: types.botonResetState });


const parsearIndDocente = (materias, indWitLiteral) => {
    const indicadoresByArea = materias.map(value => ({ area: value.materia, indicadores: [] }));

    for (const item of indWitLiteral) {

        for (const value of indicadoresByArea) {
            if (item.area === value.area) {
                value.indicadores.push({ indicador: item.indicador, literal: item.literal })
            }
        }
    }
    return { indicadoresByArea }
}


export const guardarBoletaAction = (materiasDocente) => async (dispatch, getState) => {
    // const { indicadoresByUser: data } = getState().indicador;
    const {
        gradoSeccion,
        literalesEspecialistas,
        momento,
        setLiteralIndicadores,
        studentSelected,
    } = getState().boleta;
    const { indicadoresByArea } = parsearIndDocente(materiasDocente, setLiteralIndicadores);

    console.log('se fue la data al backend')
    const { data } = await api.apiGenerarBoleta({
        gradoSeccion,
        literalesEspecialistas,
        indicadoresByArea,
        momento,
        studentSelected,
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
