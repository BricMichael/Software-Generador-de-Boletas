import Swal from "sweetalert2";
import { guardarIndicador } from "../api/api";
import { allIndicadorOfUser } from "../Redux/actions/indicadoresActions";
import { roles } from "./roles";
import { validarCampos } from "./validarRegistros";



export const enviarData = (values, resetForm, tipoDescription) => async (dispatch) => {
    const { indicador } = values;
    const { id, rol, nombre } = JSON.parse(localStorage.getItem('userActive'));
    let respErrors = '';

    if (rol === roles.docente) {
        const { literal, grado, proposito_general, ...rest } = values;
        respErrors = validarCampos(rest)
    } else { 
        const {indicador, proposito_general, literal,...rest } = values;
        respErrors = validarCampos(tipoDescription === 'proposito_general' ? rest : {literal, ...rest});
    }

    if (respErrors === 'error') return Swal.fire('¡Vaya!', 'Asegurate de haber llenado todos los campos', 'warning');
    if (tipoDescription === 'indicador' && indicador.length < 16) return Swal.fire('¡Vaya!', 'El indicador no debe contener menos de 35 caracteres', 'warning');
    if (tipoDescription === 'proposito_general' && values.proposito_general.length < 35) return Swal.fire('¡Vaya!', 'El propósito general no debe contener menos de 35 caracteres', 'warning');

    values.id_creador = id;
    values.nombre_docente = nombre;       

    await guardarIndicador(values);
    dispatch(allIndicadorOfUser());

    resetForm();
    return Swal.fire({
        icon: 'success',
        title: 'Has creado un nuevo indicador',
        showConfirmButton: false,
        timer: 1300,
        position: 'top-end'
    });
}



export const ocultarOptions = (rol) => {
    if (rol !== roles.especialista) {
        document.querySelector('#selectLiteral').setAttribute('disabled', 'true');
    }
    return rol;
}