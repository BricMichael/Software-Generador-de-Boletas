import * as api from '../../api/api';

export const obtenerUsuarios = () => async (dispatch) => {
    try {
        const { data } = await api.usuariosDataBase();   
        dispatch({ type: 'allUsers', payload: data })

    } catch (err) {
        console.log(err)
    }
}

export const usuarioActivo = ( user ) => ({
    type: 'USER ACTIVE',
    payload: user
})