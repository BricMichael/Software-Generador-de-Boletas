import style from './options.module.css';
import { useForm } from "../../helpers/useForm";
import { useDispatch } from 'react-redux'
import { filtroBusqueda } from '../../Redux/actions/indicadoresActions';

//estilar esto

export const Options = ({ cabecera = 'Mostrar indicadores por año / momento', btnText = 'Buscar' }) => {
    
    let condition = btnText === 'Buscar';
    const dispatch = useDispatch();

    const [ values, handleInputChange ] = useForm({ fecha: new Date().getFullYear(), momento: '', cedula: '' })
    const { fecha, momento, cedula } = values;

    const handleStateData = (e) => {
        e.preventDefault();
        dispatch( filtroBusqueda( fecha, momento ) );
    }

    return (
        <div>  
            <p className={style.parrafInformative}>{ cabecera }</p>
            <form onSubmit={ handleStateData } className={ condition ? style.optionsFormCont : style.conditions}>    
                <input type='text' name={ condition ? 'fecha' : 'cedula'}  autoComplete='off'
                value={ condition ? fecha : cedula} onChange={ handleInputChange } 
                placeholder={ condition === false && 'Ingrese la cédula del estudiante' }   />

                {
                    condition &&
                    <select name='momento' value={momento} onChange={handleInputChange} className={style.optionsForm_Select}>
                        <option>Momento</option>
                        <option>Momento 1</option>
                        <option>Momento 2</option>
                        <option>Momento 3</option>
                    </select>
                }
            <button type="submit">{ btnText }</button>
            </form>
        </div>
    )
}

export default Options;
