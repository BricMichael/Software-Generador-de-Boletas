import * as api from '../../api/api';
import types from '../types';

let count = 5;



export const listFiveStudents = ({seccion, grado}) => async (dispatch, getState) => {
     try {
         if ( seccion !== 'default' && seccion !== '' && grado !== 'default' && grado !== '' ) {

            const sendSearch = { seccionSelected: seccion, gradoSelected: grado, } //data parametros.
            const sendCopyToState = getState().indicador.indicadoresByUser;
            const { data } = await api.apiFiveStudents(sendSearch); 
    
            dispatch({ type: types.fiveStudents, payload: { data, grado, sendCopyToState } });  

            count = 5; // reinicia la variable nuevamente a 5 cada que se busque estudiantes.
        }
        
    } catch (err) { console.log(err.message) }
}


export const nextFiveStudents = ( seccion ) => async(dispatch, getState) => {
    try {
       const grado = getState().boleta.grado;
       const sendSearch = { valorInicial: count, seccionSelected: seccion, gradoSelected: grado, }; //data de los parametros.
       const { data } = await api.apiNextFiveStudents(sendSearch);

       dispatch({ type: types.nextFiveStudents, payload: data });
       count += 5;

   } catch (err) {
       console.log(err.message);
   }

}


export const estudianteSelected = ( estudiante ) => ({ type: types.studentSelected, payload: estudiante });


export const materiasExistentes = () => async(dispatch) => {
    try {
        const { data } = await api.apiMateriasExistentes();
        
        const materiasDocente = data.filter( materia => materia.tipo === 'docente' );
        const materiasEspecialista = data.filter( materia => materia.tipo === 'especialista' );

        dispatch({ type: types.materiasTypes, payload: { materiasDocente, materiasEspecialista } }); 
    } catch (err) {
        console.log(err.message);
    }     
}


export const updateLiteralOfIndicador = (indicador, literal) => ({
        type: types.updateLiteralDocente,
        payload: { indicador, literal }
})

export const guardarBoletaAction = () => async( dispatch, getState ) => {
    const sendCopyToState = getState().indicador.indicadoresByUser;

    dispatch({
        type: types.savedBoletaTypes,
        payload: {
            sendCopyToState,
        }
    })
}

//const uidUser = getState().auth.uid 