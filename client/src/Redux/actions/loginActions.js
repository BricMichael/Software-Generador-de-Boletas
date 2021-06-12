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

export const validarDatosLogin = async (datosLogin) => {
    const { data } = await api.validarLogin(datosLogin);
    if ( data !== 'undefined' ) localStorage.setItem('userActive', JSON.stringify(data));

    return new Promise(( resolve, reject ) => {
        resolve( data );
    })
}


export const usuarioLogeado = (validacion) => ({
    type: types.checkUser,
    payload: validacion
})

