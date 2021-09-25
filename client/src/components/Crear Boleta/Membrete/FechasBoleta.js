import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useForm } from "../../../helpers/useForm";
import { fechasBoleta } from "../../../Redux/actions/boletaActions";
import style from './membrete.module.css';


const FechasBoleta = () => {
    const dispatch = useDispatch();

    const fechas = useSelector( state => state.boleta.fechaBoleta )
    const [ values, handleInputChange ] = useForm(fechas);
    const { inicioMomento, finMomento, anioEscolar } = values;


    const sendDataFecha = () => {
        dispatch( fechasBoleta({ 
            inicioMomento: inicioMomento.trim(), 
            finMomento: finMomento.trim(), 
            anioEscolar: anioEscolar.trim() 
        }) );
    }

    return (
        <div className={style.contentForm}>
            <h3 className={style.titleFechas}>Fecha de la Boleta</h3>
            <form className={ style.group}>
                <label htmlFor='anio'>Año escolar</label>
                <input   
                    type='text'
                    placeholder='Ejemplo 2021-2022'
                    autoComplete='off'
                    name='anioEscolar'
                    value={anioEscolar}
                    onChange={handleInputChange}
                    id='anio'
                    className={ style.inputsFechas }
                />

                <label className={style.labelFechas} htmlFor='inicio'>Inicio del Momento escolar</label>
                <input   
                    type='text'
                    placeholder='Ejemplo 07/01/2021'
                    autoComplete='off'
                    name='inicioMomento'
                    value={inicioMomento}
                    onChange={handleInputChange}
                    id='inicio'
                    className={ style.inputsFechas }
                />

                <label className={style.labelFechas} htmlFor='fin'>Fin del Momento escolar</label>
                <input   
                    type='text'
                    placeholder='Ejemplo 26/03/2021'
                    autoComplete='off'
                    name='finMomento'
                    value={finMomento}
                    onChange={handleInputChange}
                    id='fin'
                    className={ style.inputsFechas }
                />
            </form>   

            <Link to='/menu-principal/creacion-de-boletas/indicadores-boleta' className={style.linkToIndicadores}  onClick={sendDataFecha}
            >
                Indicadores de la boleta ✓&nbsp; <i className="fas fa-long-arrow-alt-right"></i>
            </Link>  
        </div>
    )
}

export default FechasBoleta;
