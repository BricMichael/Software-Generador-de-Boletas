import * as api from '../../api/api';
import types from '../types';
import Swal from 'sweetalert2';


export const indicadoresUser = ( indicadores ) => ({
    type: types.indicadoresByUser,
    payload: indicadores
})


export const allIndicadorOfUser = () => async( dispatch ) => {
    try {
        const { nombre } = JSON.parse( localStorage.getItem('userActive') );
        let { data } = await api.indicadoresUserActivo({ usuario: nombre});
        dispatch( indicadoresUser( data ) );
        
    } catch (err) {
        console.log(err.message);
    }
}


export const updateTableList = (values) => ({
    type: types.updateTable,
    payload: values
})

export const deleteIndicador = ( id ) => {
    return async(dispatch) => {
        await api.eliminarIndicadorDB(id);
        dispatch({ type: types.deleteAnIndicador, payload: id })
        Swal.fire('Indicador eliminado', 'El indicador ha sido eliminado exitosamente', 'success');
    }
}

export const limpiarIndicadores = () => ({ type: types.limpiezaLogout });