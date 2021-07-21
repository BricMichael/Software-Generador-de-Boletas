import { useForm } from '../../helpers/useForm'
import style from './optionsCoordinador.module.css';





const OptionsCoordinador= () => {

    const [ values, handleInputChange ] = useForm({ fecha: new Date().getFullYear(), momento: '', cedula: '' })
    const { fecha, momento, cedula } = values;

    const handleState= () => {}

    return (
        <div>
            <p className={style.coordinador}>Indicadores por usuario</p>

            <form onSubmit={ handleState } className={ style.optionsCoordinador  }>    
                <input type='text' name='cedula'  autoComplete='off' value={ cedula} 
                onChange={ handleInputChange } placeholder='Ingrese la cédula del usuario' />

                <input type='text' name='fecha'  autoComplete='off' value={ fecha} 
                onChange={ handleInputChange }  placeholder="Año del indicador"/>
        
                <select name='momento' value={momento} onChange={handleInputChange} className={style.momentoSelect}>
                    <option>Momento</option>
                    <option>Momento 1</option>
                    <option>Momento 2</option>
                    <option>Momento 3</option>
                </select>
                
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}

export default OptionsCoordinador;
