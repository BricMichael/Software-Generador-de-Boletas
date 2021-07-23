import Swal from "sweetalert2";
import { guardarIndicador } from "../api/api";
import { actualizarIndicadorBD, limpiarFormAlActualizar, allIndicadorOfUser } from "../Redux/actions/indicadoresActions";


//IMPORTANTE-----------------------------
// separar la logica de negocio de redux thunk y ademas hacer las validaciones de los campos vacios cuando el rol es especialista.

// El tercer parametro de la funcion puede ser un id, o una funcion. Esto es así para trabajar 
// la logica dependiendo del <tipo> de accion.. <Type Save, se recibe una funcion>, <de type update se recibe un Id>
export const validar_EnviarData = (values, type, idOrFunction) => async ( dispatch ) => {
    const { indicador, literal, area, condicion_especial, grado } = values;

    values.idUser = JSON.parse(localStorage.getItem('userActive')).id;
    values.anio = new Date().getFullYear();

    if ( indicador.length < 35 ) return Swal.fire( '¡Vaya!', 'El indicador no debe contener menos de 35 caracteres', 'warning' );
    if ( area === '' || area === 'default' ) return Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado un área*', 'warning' );
    if ( condicion_especial === '' || condicion_especial === 'default' ) return Swal.fire( '¡Vaya!', 'Asegurate de haber seleccionado una opción*', 'warning' );
     
    if ( type === 'save' ) {
        await guardarIndicador( values );
        dispatch( allIndicadorOfUser() );
        idOrFunction();  // Limpia los campos del formulario.
        return Swal.fire( { icon: 'success', title: 'Has creado un nuevo indicador', showConfirmButton: false, timer: 1300,position: 'top-end' });    
    }

    if ( type === 'update' ) {
        const id_indicador = idOrFunction;
        dispatch( actualizarIndicadorBD( id_indicador, { id_indicador, ...values } )); //dataForUpdate  

        dispatch( limpiarFormAlActualizar() ); 
        return true;
    }
}



export const ocultarOptions = ( rol ) => {
    if ( rol !== 'especialista' ) { 
        document.querySelector('#selectLiteral').setAttribute('disabled', 'true');
        document.querySelector('#gradoOption').setAttribute('disabled', 'true');
    }
    return rol; 
}