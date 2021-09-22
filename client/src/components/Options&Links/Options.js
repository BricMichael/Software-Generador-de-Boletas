import style from './options.module.css';
import { useForm } from "../../helpers/useForm";
import { useDispatch } from 'react-redux'
import { filtroBusqueda } from '../../Redux/actions/indicadoresActions';


const Options = ({ vista }) => {
    
    const dispatch = useDispatch();

    const [ values, handleInputChange ] = useForm({ momento: ''  })
    const { momento } = values;

    const handleStateData = (e) => {
        e.preventDefault();
        dispatch( filtroBusqueda( momento, vista ));
    }

    return (
        <div>  
            <p className={style.parrafInformative}>Seleccione momento actual</p>
            <form onSubmit={ handleStateData } className={ style.optionsFormCont }>      
                <select 
                    name='momento' 
                    value={momento} 
                    onChange={handleInputChange} 
                    className={style.optionsForm_Select}
                >
                    <option>Momento</option>
                    <option value="Momento 1">Momento 1</option>
                    <option value="Momento 2">Momento 2</option>
                    <option value="Momento 3">Momento 3</option>
                </select>  

                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}

export default Options;
