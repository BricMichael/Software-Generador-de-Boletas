import style from './crearIndicador.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../helpers/useForm';
import { useEffect, useRef } from 'react';
import { evaluarCampos, validar_EnviarData } from '../../helpers/validarCamposIndicador';
import Swal from 'sweetalert2';
import { allIndicadorOfUser, limpiarFormAlActualizar, actualizarIndicadorBD } from '../../Redux/actions/indicadoresActions';


const CreaIndicadorDocente = () => {  
    const { dataIndicador, estado } = useSelector( state => state.indicador.updateIndicador );
    const dispatch = useDispatch();

    const [ values, handleInputChange, reset ] = useForm( dataIndicador );
    const { descripcion, literal, area, condicion_especial } = values;

    const idActive = useRef( dataIndicador.id_indicador );
  
    useEffect(() => {
        if ( dataIndicador.id_indicador !== idActive.current ) {
            reset( dataIndicador );
            idActive.current = dataIndicador.id_indicador
        }     
    }, [dataIndicador, reset])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( estado ) {    
            const resp = evaluarCampos(values)
            if ( resp ){
                dispatch( actualizarIndicadorBD( idActive.current, values  ) );
                dispatch( limpiarFormAlActualizar() ); 
            }     
        }

        if ( !estado ) {
            const resp = await validar_EnviarData( values );
            if( resp !== true ) Swal.fire('¡Vaya!', resp, 'warning');
         
            if( resp === true ) {
            Swal.fire( { icon: 'success', title: 'Has creado un nuevo indicador', showConfirmButton: false, timer: 1300,position: 'top-end', });
            reset();
            dispatch( allIndicadorOfUser() );
            } 
        } 

    }

    return (
        <div className={`${style.pag_total}`}>
            <form className={`${style.form}`} onSubmit={ handleSubmit }>
                <textarea className={`${style.textArea}`} name="descripcion" value={ descripcion } placeholder="Crea un indicador" onChange={ handleInputChange }></textarea>
                <div className={`${style.all_selects}`}>
                    <select className={`${style.select}`} name="area" value={ area  } onChange={ handleInputChange }>
                        <option value="default">&Aacute;rea</option>
                        <option value="Lengua y Literatura">Lengua y Literatura</option>
                        <option value="Matematica">Matematica</option>
                    </select>
                    <select className={`${style.select}`} name="condicion_especial" value={ condicion_especial } onChange={ handleInputChange }>
                        <option value="default">Condición Especial</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                    </select>
                    <select className={`${style.select}`} name="literal" value={ literal  } onChange={ handleInputChange }>
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
