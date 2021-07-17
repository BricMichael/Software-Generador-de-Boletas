import style from './options.module.css';
import { useForm } from "../../helpers/useForm";
import { useDispatch } from 'react-redux'
import { filtroBusqueda } from '../../Redux/actions/indicadoresActions';

//estilar esto

export const OptionsSeeIndicadores = () => {
    const dispatch = useDispatch();

    const [ values, handleInputChange ] = useForm({ fecha: new Date().getFullYear(), momento: '' })
    const { fecha, momento } = values;

    const handleStateData = (e) => {
        e.preventDefault();
        dispatch( filtroBusqueda( fecha, momento ) );
    }

    return (
        <>  
            <p className={style.parrafInformative}>Mostrar indicadores por año / momento</p>
            <form onSubmit={ handleStateData } className={style.optionsFormCont}>    
                <input type='text' name='fecha' value={ fecha }  onChange={ handleInputChange } />
                
                <select name='momento' value={momento} onChange={handleInputChange} className={style.optionsForm_Select}>
                    <option>Momento</option>
                    <option>Momento 1</option>
                    <option>Momento 2</option>
                    <option>Momento 3</option>
                </select>
            <button type="submit">Buscar</button>
            </form>
        </>
    )
}

export default OptionsSeeIndicadores;
