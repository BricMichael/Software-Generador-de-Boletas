import * as api from '../../api/api';
import types from '../types';
import { alertDeleteItems, alertSuccess } from '../../helpers/alerts';



export const filtroBusqueda = (momento, vista, idUser, grado) => async (dispatch) => {
    try {  // param vista, saber que componente esta haciendo la llamada para saber que estadoReducer actualizar con la data.
        const { id } = JSON.parse(localStorage.getItem('userActive'));
        let { data } = await api.indicadoresUserActivo({ momento, id_creador: !idUser ? id : idUser, grado });

        vista === 'Indicador'
            ? dispatch({ type: types.momentoAndYear, payload: { data, momento, grado} }) // estado vista indicador
            : dispatch({ type: types.allIndicadoresOfUser, payload: { data, momento, grado } })  // estado vista Boleta

        return data;
    } catch (err) {
        console.log(err.message);
    }
}


export const allIndicadorOfUser = () => async (dispatch, getState) => {
    try {
        const { momento, grado } = getState().indicador
        const { id } = JSON.parse(localStorage.getItem('userActive'));
        const { data } = await api.indicadoresUserActivo({ momento, id_creador: id, grado });
        dispatch({ type: types.indicadoresByUser, payload: data });

    } catch (err) { console.log(err.message) }
}


export const limpiarFormAlActualizar = () => ({ type: types.limpiarInputsForm })


export const actualizarIndicadorBD = (dataForUpdate) => async (dispatch) => {
    await api.updateIndicadorActivo(dataForUpdate.id, dataForUpdate);

    dispatch({ type: types.refreshData, payload: { id: dataForUpdate.id, dataForUpdate } });
    dispatch(limpiarFormAlActualizar());

    alertSuccess('Tus modificaciones han sido realizadas');
}

export const indicadorActivo = (values) => ({
    type: types.indicadorActive,
    payload: values
})


export const deleteIndicador = (id) => {
    return async (dispatch) => {
        const resp = await alertDeleteItems('¿Eliminar indicador?');

        if (resp) {
            await api.eliminarIndicadorDB(id);
            dispatch({ type: types.deleteAnIndicador, payload: id });
            alertSuccess('La acción ha sido completada');
        }
    }
}

export const limpiarIndicadores = () => ({ type: types.limpiezaLogout });
