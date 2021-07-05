import * as api from '../../api/api';
import types from '../types';

let count = 5;



export const listFiveStudents = ({seccion, grado}) => async (dispatch) => {
     try {
         if( seccion !== 'default' && seccion !== '' 
            && grado !== 'default' && grado !== '' ) {
            const sendSearch = { seccionSelected: seccion, gradoSelected: grado, } //data de los parametros.
            const { data } = await api.apiFiveStudents(sendSearch)
    
            dispatch({ type: types.fiveStudents, payload: data })   
    
            count = 5; // reinicia la variable nuevamente a 5 cada que se busque estudiantes.
         }
        
    } catch (err) {
        console.log(err.message);
    }

}
// params, valorInicial, seccion, grado
export const nextFiveStudents = (grado,seccion) => async(dispatch) => {
    try {
       const sendSearch = { valorInicial: count, seccionSelected: seccion, gradoSelected: grado, } //data de los parametros.
       const { data } = await api.apiNextFiveStudents(sendSearch)

       dispatch({ type: types.fiveStudents, payload: data })
       count += 5;

   } catch (err) {
       console.log(err.message);
   }

}


export const estudianteSelected = ( estudiante ) => ({
    type: types.studentSelected,
    payload: estudiante,
})


export const callsBackendViewCrearBoleta = () => async(dispatch) => {
    try {
        const { nombre } = JSON.parse( localStorage.getItem('userActive') );
        const { data: indicadores } = await api.indicadoresUserActivo({ usuario: nombre });
        const { data } = await api.materiasExistentes();
        
        const materiasDocente = data.filter( materia => materia.tipo === 'docente' );
        const materiasEspecialista = data.filter( materia => materia.tipo === 'especialista' );

        dispatch({
            type: types.materiasIndicadoresByUser,
            payload: { indicadores, materiasDocente, materiasEspecialista }
        }) 
    } catch (err) {
        console.log(err.message)
    }     
}
