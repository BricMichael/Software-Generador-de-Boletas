import { guardarIndicador } from "../api/api";


const Validar_EnviarData = async(values) => {
    const { descripcion, literal, area, condicionEspecial } = values;
  
    if ( descripcion.length < 48 ) return 'El indicador no debe contener menos de 50 caracteres';
    if ( literal === '' || literal === 'default' ) return 'Asegurate de haber seleccionado un literal*';
    if ( area === '' || area === 'default' ) return 'Asegurate de haber seleccionado un área*';
    if ( condicionEspecial === '' || condicionEspecial === 'default' ) return 'Asegurate de haber seleccionado una opción*';
    
    if( values ) {
        await guardarIndicador(values);
        return true;
    }
}



export default Validar_EnviarData;