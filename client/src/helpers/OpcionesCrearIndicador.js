import Swal from "sweetalert2";
import { guardarIndicador } from "../api/api";
import { allIndicadorOfUser } from "../Redux/actions/indicadoresActions";
import { roles } from "./roles";
import { validarCampos } from "./validarRegistros";



export const enviarData = ( values, resetForm ) => async ( dispatch ) => {
    const { indicador } = values;
    const { id, rol } = JSON.parse(localStorage.getItem('userActive'));
    let respErrors = '';

    if ( rol === roles.docente ) {
        const { literal, grado, ...rest  } = values;
        respErrors = validarCampos(rest) 
    }else { respErrors = validarCampos(values) }

    if ( indicador.length < 35 ) return Swal.fire( '¡Vaya!', 'El indicador no debe contener menos de 35 caracteres', 'warning' );
    if ( respErrors === 'error') return Swal.fire( '¡Vaya!', 'Asegurate de haber llenado todos los campos', 'warning' );

    values.idUser = id;
    values.anio = new Date().getFullYear(); 

    await guardarIndicador( values );
    dispatch( allIndicadorOfUser() );

    resetForm();
    return Swal.fire({
        icon: 'success', 
        title: 'Has creado un nuevo indicador', 
        showConfirmButton: false, 
        timer: 1300,
        position: 'top-end' 
    });       
}



export const ocultarOptions = ( rol ) => {
    if ( rol !== roles.especialista ) { 
        document.querySelector('#selectLiteral').setAttribute('disabled', 'true');
        document.querySelector('#gradoOption').setAttribute('disabled', 'true');
    }
    return rol; 
}