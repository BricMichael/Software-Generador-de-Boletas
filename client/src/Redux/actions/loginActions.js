import * as api from '../../api/api';
import { alertSuccess } from '../../helpers/alerts'
import types from '../types';



export const validarDatosLogin = async (datosLogin, cambiarClave) => {
    if ( !cambiarClave ) {
        const { data } = await api.validarLogin(datosLogin);
        if ( data.autorizacion ) localStorage.setItem('userActive', JSON.stringify(data.datos));
    
        return new Promise(( resolve, reject ) => {
            resolve( data );
        })
    }

    const { data } = await api.cambiarClaveAdmin(datosLogin);
    alertSuccess(data.msg, 'center');
    return new Promise(( resolve, reject ) => {
        resolve( data );
    })
}


export const usuarioLogeado = (validacion) => ({
    type: types.checkUser,
    payload: validacion
})

