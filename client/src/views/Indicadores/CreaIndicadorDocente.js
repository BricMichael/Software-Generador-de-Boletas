import style from './crearIndicador.module.css';
import { useForm } from '../../helpers/useForm';
import Validar_EnviarData from '../../helpers/validarCamposIndicador';
import { useEffect } from 'react';
import Swal from 'sweetalert2';



const initialForm = { descripcion: '', literal: '', area: '',condicionEspecial: ''}

const CreaIndicadorDocente = () => {  // componente

    const [values, handleInputChange ] = useForm( initialForm );
    const { descripcion, literal, area, condicionEspecial } = values;
   
    useEffect(() => {
        values.usuario = JSON.parse(localStorage.getItem('userActive')).nombre;
        values.fechaCreacion = new Date().toLocaleDateString();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let resp = await Validar_EnviarData(values)
        if( resp !== true ) Swal.fire('¡Vaya!', resp, 'warning');
        if( resp === true ) Swal.fire('Has creado un nuevo indicador', 'El indicador ha sido guardado con exito', 'success')
      
    }



    return (
        <div className={`${style.pag_total}`}>
            <form className={`${style.form}`} onSubmit={ handleSubmit }>
                <textarea className={`${style.textArea}`} name="descripcion" value={ descripcion } placeholder="Escribe tu indicador" onChange={ handleInputChange }></textarea>
                <div className={`${style.all_selects}`}>
                    <select className={`${style.select}`} name="area" value={ area } onChange={ handleInputChange }>
                        <option value="default">&Aacute;rea</option>
                        <option value="Lengua y Literatura">Lengua y Literatura</option>
                        <option value="Matematica">Matematica</option>
                    </select>
                    <select className={`${style.select}`} name="condicionEspecial" value={ condicionEspecial } onChange={ handleInputChange }>
                        <option value="default">Condición Especial</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                    </select>
                    <select className={`${style.select}`} name="literal" value={ literal } onChange={ handleInputChange }>
                        <option value="default">Literal</option>
                        <option value="E">E</option>
                        <option value="B">B</option>
                        <option value="RN">RN</option>
                    </select>
                
                    <button type="submit" className={`${style.button}`}>Guardar</button> 
                </div>  
            </form>
        </div>
    );
}

export default CreaIndicadorDocente;
