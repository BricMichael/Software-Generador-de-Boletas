import { useEffect, useRef } from 'react';
import style from './crearIndicador.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../helpers/useForm';
import { validar_EnviarData, ocultarOptions } from '../../helpers/validarCamposIndicador';



const CreaIndicador = () => {  
    
    const { dataIndicador, estado } = useSelector( state => state.indicador.updateIndicador );
    const { materiasDocente, materiasEspecialista} = useSelector( state => state.indicador.materias );
    const dispatch = useDispatch();

    const [ values, handleInputChange, reset ] = useForm( dataIndicador );
    const { descripcion, literal, area, condicion_especial, grado } = values;

    const idActive = useRef( dataIndicador.id_indicador );
    const rolUser = useRef();

    useEffect(() => {
        const rol = ocultarOptions();  
        rolUser.current = rol;
    }, [])

    useEffect(() => {
        if ( dataIndicador.id_indicador !== idActive.current ) {
            reset( dataIndicador );
            idActive.current = dataIndicador.id_indicador
        }
    }, [dataIndicador, reset])

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( estado ) dispatch( validar_EnviarData( values, 'update', idActive.current ) );
        if ( !estado ) dispatch( validar_EnviarData( values, 'save', reset ) );
    }

    const recorrerArray = rolUser.current === 'especialista' ? materiasEspecialista : materiasDocente;
 
    return (
        <div className={`${style.pag_total}`}>
            <form className={`${style.form}`} onSubmit={ handleSubmit }>
                <textarea className={`${style.textArea}`} name="descripcion" value={ descripcion } placeholder="Crea un indicador" onChange={ handleInputChange }></textarea>
                <div className={`${style.all_selects}`}>
                    
                        
                    <select className={`${style.select}`} name='area' value={ area } 
                        onChange={ handleInputChange }>                  
                        <option value="undefined">Área</option>
                        {           
                            recorrerArray.map( area => (
                                <option value={area.materia} key={area.materia} >{area.materia}
                                </option>
                            ))
                        }                               
                    </select>
                    <select className={`${style.select}`} name="condicion_especial" value={ condicion_especial } onChange={ handleInputChange }>
                        <option value="default">Cond. Especial</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                    </select>
                       
                    <select className={`${style.select}`} name="literal" value={ literal  }
                     onChange={handleInputChange} id="selectLiteral" >
                        <option value="default">Literal</option>
                        <option value="E">E</option>
                        <option value="B">B</option>
                        <option value="RN">RN</option>
                    </select>

                    <select className={`${style.select}`} name="grado" value={ grado } onChange={ handleInputChange } id="gradoOption">
                            <option value="default">Grado</option>
                            <option value="1">1er Grado</option>
                            <option value="2">2do Grado</option>
                            <option value="3">3er Grado</option>
                            <option value="4">4to Grado</option>
                            <option value="5">5to Grado</option>
                            <option value="6">6to Grado</option>
                    </select>
                    <button type="submit" className={`${style.button}`}>Guardar</button> 
                </div>  
            </form>
        </div>
    );
}

export default CreaIndicador;
