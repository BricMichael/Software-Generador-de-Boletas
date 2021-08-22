import * as api from '../../api/api';
import types from '../types';
import { alertDeleteItems, alertSuccess } from '../../helpers/alerts';


export const filtroBusqueda = ( momento, vista ) => async( dispatch, getState ) => {
    try {
        const { id } = JSON.parse( localStorage.getItem('userActive') );
        let { data } = await api.indicadoresUserActivo({ momento, id });

        if ( vista === 'Indicador' ) dispatch({ type: types.momentoAndYear, payload:{ data, momento }})
        else {
            dispatch({ type: types.momentoAndYear, payload: { data, momento : '' } })   // estado vista ListaIndicadores.
            dispatch({ type: types.allIndicadoresOfUser, payload: { data, momento } });  // estado vista Boleta
        } 
    } catch (err) {
        console.log( err.message );
    }
}

export const allIndicadorOfUser = () => async( dispatch, getState ) => {
    try {
        const { momento } = getState().indicador
        const { id } = JSON.parse( localStorage.getItem('userActive') );
        let { data } = await api.indicadoresUserActivo({ momento, id });
        dispatch({ type: types.indicadoresByUser, payload: data });
        
    } catch (err) { console.log(err.message) }
}

export const actualizarIndicadorBD = ( id, dataForUpdate ) => async( dispatch ) => {

    await api.updateIndicadorActivo( id, dataForUpdate );

    dispatch({ type: types.refreshData, payload: { id, dataForUpdate } });
    dispatch( limpiarFormAlActualizar() );

    alertSuccess('Tus modificaciones han sido realizadas');
}


export const indicadorActivo = (values) => ({
    type: types.indicadorActive,
    payload: values
})


export const limpiarFormAlActualizar = () => ( {type: types.limpiarInputsForm} )


export const deleteIndicador = ( id ) => {
    return async(dispatch) => {
        const resp = await alertDeleteItems('¿Eliminar indicador?');
        
        if ( resp ) {
            await api.eliminarIndicadorDB(id);
            dispatch({ type: types.deleteAnIndicador, payload: id });
            alertSuccess('La acción ha sido completada');
        }
    }
}

export const limpiarIndicadores = () => ({ type: types.limpiezaLogout });
