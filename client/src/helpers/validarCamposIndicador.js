import { guardarIndicador } from "../api/api";


const Validar_EnviarData = async(values) => {
    const { descripcion, literal, area, condicionEspecial } = values;
    
    values.usuario = JSON.parse(localStorage.getItem('userActive')).nombre;
    values.fechaCreacion = new Date().toLocaleDateString();

    if ( descripcion.length < 48 ) return 'El indicador no debe contener menos de 50 caracteres';
    if ( area === '' || area === 'default' ) return 'Asegurate de haber seleccionado un área*';
    if ( condicionEspecial === '' || condicionEspecial === 'default' ) return 'Asegurate de haber seleccionado una opción*';
    if ( literal === '' || literal === 'default' ) return 'Asegurate de haber seleccionado un literal*';
   
    if( values ) {
        await guardarIndicador(values);
        return true;
    }
}



export default Validar_EnviarData;