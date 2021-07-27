import Swal from "sweetalert2";
import { guardarIndicador } from "../api/api";
import { allIndicadorOfUser } from "../Redux/actions/indicadoresActions";


//IMPORTANTE-----------------------------
// separar la logica de negocio de redux thunk y ademas hacer las validaciones de los campos vacios cuando el rol es especialista.

export const validar_EnviarData = ( values, cleanForm ) => async ( dispatch ) => {
    const { indicador,  area, condicion_especial } = values;

    values.idUser = JSON.parse(localStorage.getItem('userActive')).id;
    values.anio = new Date().getFullYear();

    if ( indicador.length < 35 ) return Swal.fire( '¡Vaya!', 'El indicador no debe contener menos de 35 caracteres', 'warning' );
    if ( area === '' || area === 'default' ) return Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado un área*', 'warning' );
    if ( condicion_especial === '' || condicion_especial === 'default' ) return Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado una opción*', 'warning' );
     
    await guardarIndicador( values );
    dispatch( allIndicadorOfUser() );
    cleanForm();  // Limpia los campos del formulario.
    return Swal.fire( { icon: 'success', title: 'Has creado un nuevo indicador', showConfirmButton: false, timer: 1300,position: 'top-end' });    
    
}



export const ocultarOptions = ( rol ) => {
    if ( rol !== 'especialista' ) { 
        document.querySelector('#selectLiteral').setAttribute('disabled', 'true');
        document.querySelector('#gradoOption').setAttribute('disabled', 'true');
    }
    return rol; 
}