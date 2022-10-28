import { useEffect, useRef, useState } from 'react';
import style from './crearIndicador.module.css';
import { stateCrearIndicador } from '../../helpers/estadosRegistros';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../helpers/useForm';
import { enviarData, ocultarOptions } from '../../helpers/OpcionesCrearIndicador';
import { roles } from '../../helpers/roles';




const CreaIndicador = () => {
    const { materiasDocente, materiasEspecialista } = useSelector(state => state.indicador.materias);
    const [tipoDescription, setTipoDescription] = useState('');
    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm(stateCrearIndicador);

    const { indicador, literal, area, condicion_especial, grado, momento, proposito_general } = values;
    const rolUser = useRef(JSON.parse(localStorage.getItem('userActive')).rol);
    const isPropositoGeneral = tipoDescription === 'proposito_general';

    useEffect(() => {
        ocultarOptions(rolUser.current);
    }, [])

    const handleTipoDescription = ( valor ) => {
        setTipoDescription(valor);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isPropositoGeneral) values.indicador = '';
        if(tipoDescription === 'indicador') values.proposito_general = '';
        dispatch(enviarData(values, reset, tipoDescription));
    }

    const recorrerArray = rolUser.current === roles.especialista ? materiasEspecialista : materiasDocente;

    return (
        <div className={`${style.pag_total}`}>
            <form className={`${style.form}`} onSubmit={handleSubmit}>
                <textarea 
                    className={`${style.textArea}`} 
                    name={`${isPropositoGeneral ? 'proposito_general' : 'indicador'}`} 
                    value={isPropositoGeneral ? proposito_general : indicador} 
                    placeholder={`Escribe aquí ${ isPropositoGeneral ? 'el propósito general...' : 'el indicador...'}`} 
                    onChange={handleInputChange}
                >
                </textarea>
                <div className={`${style.all_selects}`}>
                    { rolUser.current === 'especialista' &&
                        <select className={`${style.select}`} name="tipoDescription" value={tipoDescription} onChange={(e) => handleTipoDescription(e.target.value)}>
                            <option>Descripción</option>
                            <option value="proposito_general">Proposito General</option>
                            <option value="indicador">Indicador</option>                
                        </select>
                    }
                    <select className={`${style.select}`} name='area' value={area}
                        onChange={handleInputChange}>
                        <option>Área</option>
                        {
                            recorrerArray.map(area => (
                                <option value={area.materia} key={area.materia} >{area.materia}</option>
                            ))
                        }
                    </select>
                    <select className={`${style.select}`} name="condicion_especial" value={condicion_especial} onChange={handleInputChange}>
                        <option>Cond. Especial</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                    </select>

                    <select className={`${style.select}`} name="momento" value={momento} onChange={handleInputChange}>
                        <option>Momento</option>
                        <option value="momento 1">Momento 1</option>
                        <option value="momento 2">Momento 2</option>
                        <option value="momento 3">Momento 3</option>
                    </select>

                    <select className={`${style.select}`} name="grado" value={grado} onChange={handleInputChange} id="gradoOption">
                        <option>Grado</option>
                        <option value="nivel1">Nivel 1</option>
                        <option value="nivel2">Nivel 2</option>
                        <option value="nivel3">Nivel 3</option>                  
                    </select>

                    <select className={`${style.select}`} name="literal" value={literal}
                        onChange={handleInputChange} id="selectLiteral" >
                        <option>Literal</option>
                        <option value="muy bien">Muy bien</option>
                        <option value="bien">Bien</option>
                        <option value="en proceso">En proceso</option>
                        <option value="requiere nivelación">Requiere nivelación</option>
                    </select>                   
                    <button type="submit" className={`${style.button}`}>Guardar</button>
                </div>
            </form>
        </div>
    );
}

export default CreaIndicador;
