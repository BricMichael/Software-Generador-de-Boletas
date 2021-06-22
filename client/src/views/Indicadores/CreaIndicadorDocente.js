import { useEffect, useRef } from 'react';
import style from './crearIndicador.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../helpers/useForm';
import { evaluarCampos, validar_EnviarData } from '../../helpers/validarCamposIndicador';
import { allIndicadorOfUser } from '../../Redux/actions/indicadoresActions';


const CreaIndicadorDocente = () => {  
    const { dataIndicador, estado } = useSelector( state => state.indicador.updateIndicador );
    const dispatch = useDispatch();

    const [ values, handleInputChange, reset ] = useForm( dataIndicador );
    const { descripcion, literal, area, condicion_especial } = values;

    const idActive = useRef( dataIndicador.id_indicador );
  
    useEffect(() => {
        const { rol } = JSON.parse( localStorage.getItem('userActive') );

        if ( dataIndicador.id_indicador !== idActive.current ) {
            reset( dataIndicador );
            idActive.current = dataIndicador.id_indicador
        }
        
        if ( rol !== 'especialista' ) document.querySelector('#selectLiteral').setAttribute('disabled', 'true');
    }, [dataIndicador, reset])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( estado ) dispatch( evaluarCampos( values, idActive ) );

        if ( !estado ) {
            const resp = await validar_EnviarData( values );
         
            if( resp === true ) {
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
                    <select className={`${style.select}`} name="literal" value={ literal  } onChange={ handleInputChange } id="selectLiteral" >
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
