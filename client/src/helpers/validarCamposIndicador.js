import Swal from "sweetalert2";
import { guardarIndicador } from "../api/api";
import { actualizarIndicadorBD, limpiarFormAlActualizar, allIndicadorOfUser
} from "../Redux/actions/indicadoresActions";


// El tercer parametro de la funcion puede ser un id, o una funcion. Esto es así para trabajar 
// la logica dependiendo del <tipo> de accion.. <Type Save, se recibe una funcion>, <de type update se recibe un Id>
export const validar_EnviarData = (values, type, idOrFunction) => async ( dispatch ) => {
    const { descripcion, literal, area, condicion_especial } = values;

    values.usuario = JSON.parse(localStorage.getItem('userActive')).nombre;
    values.fechaCreacion = new Date().toLocaleDateString();

    if ( descripcion.length < 35 ) return Swal.fire( '¡Vaya!', 'El indicador no debe contener menos de 35 caracteres', 'warning' );
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
        dispatch( actualizarIndicadorBD( id_indicador, 
        { id_indicador, descripcion, literal, area, condicion_especial } )); //dataForUpdate

        dispatch( limpiarFormAlActualizar() ); 
        return true;
    }
}

