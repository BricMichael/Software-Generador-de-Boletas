import * as api from '../../api/api';
import types from '../types';

let count = 0;


// params, seccion, grado 
export const listFiveStudents = () => async (dispatch) => {

    const { data } = await api.apiFiveStudents({valorInicial: count})
    dispatch({
        type: types.fiveStudents,
        payload: data
    })
    
      count += 5;

}

export const estudianteSelected = ( estudiante ) => ({
    type: types.studentSelected,
    payload: estudiante,
})

export const materiasBD = () => async( dispatch ) => {
    const { data } = await api.materiasExistentes();
    const materiasDocente = data.filter( materia => materia.tipo === 'docente' );
    const materiasEspecialista = data.filter( materia => materia.tipo === 'especialista' );

    dispatch({
        type: types.materiasDB,
        payload: {
            materiasEspecialista,
            materiasDocente
        }
    })
}