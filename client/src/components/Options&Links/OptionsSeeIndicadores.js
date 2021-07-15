import { useForm } from "../../helpers/useForm";

//estilar esto

export const OptionsSeeIndicadores = () => {

    const [ values, handleInputChange, reset ] = useForm({ fecha: '', momento: '' })
    const { fecha, momento } = values;

    const handleStateData = (e) => {
        e.preventDefault();
        const anioSelected = fecha.slice(0,4);
        
    }

    return (
        <form onSubmit={ handleStateData }>    
            <input type='date' name='fecha' value={ fecha }  onChange={ handleInputChange } />
            
            <select name='momento' value={momento} onChange={handleInputChange} >
                <option>Momento</option>
                <option>Momento 1</option>
                <option>Momento 2</option>
                <option>Momento 3</option>
            </select>
          <button type="submit">Buscar</button>
        </form>
    )
}

export default OptionsSeeIndicadores;
