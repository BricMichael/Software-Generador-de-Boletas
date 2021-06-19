import style from './crearIndicador.module.css';
import { useForm } from '../../helpers/useForm';
import Validar_EnviarData from '../../helpers/validarCamposIndicador';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { allIndicadorOfUser } from '../../Redux/actions/indicadoresActions';


const CreaIndicadorDocente = () => {  

    const dispatch = useDispatch();
    const [values, handleInputChange, reset ] = useForm({ descripcion: '', literal: '', area: '',condicionEspecial: '' });
    const { descripcion, literal, area, condicionEspecial } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await Validar_EnviarData( values );

        if( resp !== true ) Swal.fire('¡Vaya!', resp, 'warning');
        if( resp === true ) {
            Swal.fire('Has creado un nuevo indicador', 'El indicador ha sido guardado exitosamente', 'success');
            reset();
            dispatch( allIndicadorOfUser() );
        }  
    }

    return (
        <div className={`${style.pag_total}`}>
            <form className={`${style.form}`} onSubmit={ handleSubmit }>
                <textarea className={`${style.textArea}`} name="descripcion" value={ descripcion } placeholder="Crea un indicador" onChange={ handleInputChange }></textarea>
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
