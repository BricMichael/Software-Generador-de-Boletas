import style from './options.module.css';
import { useForm } from "../../helpers/useForm";
import { useDispatch } from 'react-redux'
import { filtroBusqueda } from '../../Redux/actions/indicadoresActions';


const Options = ({ cabecera = 'Mostrar indicadores por momento', btnText = 'Buscar', vista = 'Indicador'}) => {
    
    let condition = btnText === 'Buscar';
    const dispatch = useDispatch();

    const [ values, handleInputChange ] = useForm({ momento: '', cedula: '' })
    const { momento, cedula } = values;

    const handleStateData = (e) => {
        e.preventDefault();
        dispatch( filtroBusqueda( momento, vista ));
    }

    return (
        <div>  
            <p className={style.parrafInformative}>{ cabecera }</p>
            <form onSubmit={ handleStateData } className={ condition ? style.optionsFormCont : style.conditions}>    
               {
                    !condition && <input type='text' name='cedula' autoComplete='off'
                    value={ cedula } onChange={ handleInputChange } 
                    placeholder={ 'Ingrese la cédula del estudiante' } />
               }

                {
                    condition &&
                    <select name='momento' value={momento} onChange={handleInputChange} className={style.optionsForm_Select}>
                        <option>Momento</option>
                        <option value="Momento 1">Momento 1</option>
                        <option value="Momento 2">Momento 2</option>
                        <option value="Momento 3">Momento 3</option>
                    </select>
                }
            <button type="submit">{ btnText }</button>
            </form>
        </div>
    )
}

export default Options;
