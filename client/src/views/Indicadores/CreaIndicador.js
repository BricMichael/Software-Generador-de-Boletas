import { useEffect, useRef } from 'react';
import style from './crearIndicador.module.css';
import { stateCrearIndicador } from '../../helpers/estadosRegistros';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../helpers/useForm';
import { enviarData, ocultarOptions } from '../../helpers/OpcionesCrearIndicador';
import { roles } from '../../helpers/roles';




const CreaIndicador = () => {

    const { materiasDocente, materiasEspecialista } = useSelector(state => state.indicador.materias);
    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm(stateCrearIndicador);

    const { indicador, literal, area, condicion_especial, grado, momento } = values;
    const rolUser = useRef(JSON.parse(localStorage.getItem('userActive')).rol);

    useEffect(() => {
        ocultarOptions(rolUser.current);
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(enviarData(values, reset));
    }

    const recorrerArray = rolUser.current === roles.especialista ? materiasEspecialista : materiasDocente;

    return (
        <div className={`${style.pag_total}`}>
            <form className={`${style.form}`} onSubmit={handleSubmit}>
                <textarea className={`${style.textArea}`} name="indicador" value={indicador} placeholder="Escribe aquí el indicador" onChange={handleInputChange}></textarea>
                <div className={`${style.all_selects}`}>


                    <select className={`${style.select}`} name='area' value={area}
                        onChange={handleInputChange}>
                        <option value="default">Área</option>
                        {
                            recorrerArray.map(area => (
                                <option value={area.materia} key={area.materia} >{area.materia}</option>
                            ))
                        }
                    </select>
                    <select className={`${style.select}`} name="condicion_especial" value={condicion_especial} onChange={handleInputChange}>
                        <option value="No">Cond. Especial</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                    </select>

                    <select className={`${style.select}`} name="momento" value={momento} onChange={handleInputChange}>
                        <option value="default">Momento</option>
                        <option value="Momento 1">Momento 1</option>
                        <option value="Momento 2">Momento 2</option>
                        <option value="Momento 3">Momento 3</option>

                    </select>

                    <select className={`${style.select}`} name="literal" value={literal}
                        onChange={handleInputChange} id="selectLiteral" >
                        <option value="default">Literal</option>
                        <option value="E">E</option>
                        <option value="B">B</option>
                        <option value="RN">RN</option>
                    </select>

                    <select className={`${style.select}`} name="grado" value={grado} onChange={handleInputChange} id="gradoOption">
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
