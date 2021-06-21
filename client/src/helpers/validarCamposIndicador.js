import Swal from "sweetalert2";
import { guardarIndicador } from "../api/api";




export const validar_EnviarData = async(values) => {
    const { descripcion, literal, area, condicion_especial } = values;
    
    values.usuario = JSON.parse(localStorage.getItem('userActive')).nombre;
    values.fechaCreacion = new Date().toLocaleDateString();

    if ( descripcion.length < 48 ) return 'El indicador no debe contener menos de 50 caracteres';
    if ( area === '' || area === 'default' ) return 'Asegurate de haber seleccionado un área*';
    if ( condicion_especial === '' || condicion_especial === 'default' ) return 'Asegurate de haber seleccionado una opción*';
    if ( literal === '' || literal === 'default' ) return 'Asegurate de haber seleccionado un literal*';
   
    if( values ) {
        await guardarIndicador(values);
        return true;
    }
}



export const evaluarCampos = (  values ) => {
    const { descripcion, literal, area, condicion_especial } = values;

    if ( descripcion.length < 48 ) {
        Swal.fire( '¡Vaya!', 'El indicador no debe contener menos de 50 caracteres', 'warning' );
        return false;
    }
    if ( area === '' || area === 'default' ) {
        Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado un área*', 'warning' );
        return false;
    }
    if ( condicion_especial === '' || condicion_especial === 'default' ) {
        Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado una opción*', 'warning' );
        return false;
    }
    if ( literal === '' || literal === 'default' ) {
        Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado un literal*', 'warning' );
        return false;
    }

    if( values ) return true;  

}