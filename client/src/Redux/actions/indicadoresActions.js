import * as api from '../../api/api';
import types from '../types';
import Swal from 'sweetalert2';




export const allIndicadorOfUser = () => async( dispatch ) => {
    try {
        const { nombre } = JSON.parse( localStorage.getItem('userActive') );
        let { data } = await api.indicadoresUserActivo({ usuario: nombre });
        dispatch({ type: types.indicadoresByUser, payload: data });
        
    } catch (err) { console.log(err.message)  }
}

export const actualizarIndicadorBD = ( id, dataForUpdate ) => async( dispatch ) => {

    await api.updateIndicadorActivo( id, dataForUpdate );
    dispatch( refreshData( id, dataForUpdate ) );

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tus modificaciones han sido realizadas',
        showConfirmButton: false,
        timer: 1300
      })
}

export const refreshData = ( id, refrescarData ) => ({

    type: types.refreshData,
    payload: { 
        id, 
        refrescarData    
    }

})

export const indicadorActivo = (values) => ({
    type: types.indicadorActive,
    payload: values
})


export const limpiarFormAlActualizar = () => ( {type: types.limpiarInputsForm} )


export const deleteIndicador = ( id ) => {
    return async(dispatch) => {
  
        const { isConfirmed } = await Swal.fire({
                title: '¿Eliminar indicador?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!',
                cancelButtonText: 'Cancelar'
        })

        if ( isConfirmed ) {
            await api.eliminarIndicadorDB(id);
            dispatch({ type: types.deleteAnIndicador, payload: id });
            Swal.fire( { icon: 'success', title: 'La acción ha sido completada', showConfirmButton: false, timer: 1100 });
        }
    }
}

export const limpiarIndicadores = () => ({ type: types.limpiezaLogout });
