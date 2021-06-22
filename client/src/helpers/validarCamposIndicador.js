import Swal from "sweetalert2";
import { guardarIndicador } from "../api/api";
import { actualizarIndicadorBD, limpiarFormAlActualizar } from "../Redux/actions/indicadoresActions";


export const validar_EnviarData = async(values) => {
    const { descripcion, literal, area, condicion_especial } = values;
    
    values.usuario = JSON.parse(localStorage.getItem('userActive')).nombre;
    values.fechaCreacion = new Date().toLocaleDateString();

    if ( descripcion.length < 48 ) return Swal.fire( '¡Vaya!', 'El indicador no debe contener menos de 50 caracteres', 'warning' );
    if ( area === '' || area === 'default' ) return Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado un área*', 'warning' );
    if ( condicion_especial === '' || condicion_especial === 'default' ) return Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado una opción*', 'warning' );
     
    if( values ) {
        await guardarIndicador( values );
        Swal.fire( { icon: 'success', title: 'Has creado un nuevo indicador', showConfirmButton: false, timer: 1300,position: 'top-end' });
        return true;
    }
}


export const evaluarCampos = ( values, idActive ) => (dispatch) => {
    const { descripcion, literal, area, condicion_especial } = values;

    let errors = 0;

    if ( descripcion.length < 48 ) {
        Swal.fire( '¡Vaya!', 'El indicador no debe contener menos de 50 caracteres', 'warning' );
        errors++;
    }
    if ( area === '' || area === 'default' ) {
        Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado un área*', 'warning' );
        errors++;
    }
    if ( condicion_especial === '' || condicion_especial === 'default' ) {
        Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado una opción*', 'warning' );
        errors++;
    }
    // if ( literal === '' || literal === 'default' ) {
    //     Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado un literal*', 'warning' );
    //     errors++;
    // }
    if( errors === 0) {
        dispatch( actualizarIndicadorBD( idActive.current, values  ) );
        dispatch( limpiarFormAlActualizar() ); 
        return true;
    }
}