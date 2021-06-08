import * as api from '../../api/api';
import types from '../types';


export const obtenerUsuarios = () => async (dispatch) => {
    try {
        const { data } = await api.usuariosDataBase();   
        dispatch({ type: types.allUsers, payload: data })

    } catch (err) {
        console.log(err)
    }
}

export const usuarioActivo = ( user ) => ({
    type: types.userActive,
    payload: user
})