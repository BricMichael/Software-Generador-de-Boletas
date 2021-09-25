import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import materiaConIndicadores from "../../helpers/IndicaDocenteBoleta";
import Options from "../Options/Options";
import style from './cuerpoBoleta.module.css';
import IndicadoresAreas from "./IndicadoresBoleta/IndicadoresAreas";
import IndicadoresEspecialista from "./IndicadoresBoleta/IndicadoresEspecialista";




const CuerpoBoleta = () => {
    // to='/menu-principal/creacion-de-boletas'
    const indicadoresByUser = useSelector( state => state.indicador.indicadoresByUser );
    const { materiasDocente, materiasEspecialista } = useSelector( state => state.indicador.materias );

    let comprobacion = indicadoresByUser.length > 0;
 
    const materiasWithIndic =  comprobacion && materiaConIndicadores(materiasDocente, indicadoresByUser);

    const ejecutar = () => {
        console.log('me muestro')
    }

    return (
        <>
            <Options vista='Boleta' />
            {
                comprobacion &&
                <div className={ style.display }>
                    <h2>Indicadores</h2>
                    <div className={ style.leyendaFlex }>
                        <h3 className={ style.leyendaTitulos }>Leyenda:</h3>
                        <p className={ style.leyendaTitulos }><b>E:</b> Exelente</p>
                        <p className={ style.leyendaTitulos }><b>B:</b> Bien</p>
                        <p className={ style.leyendaTitulos }><b>RN:</b> Requiere nivelaci&oacute;n</p>
                    </div>
                    <div className={style.derechita}>
                        <>
                        {   comprobacion &&
                                materiasWithIndic.map( materia => (
                                    <IndicadoresAreas
                                        key={ materia.area} 
                                        allIndicadores={ materia.indicadores} 
                                        area={ materia.area }    
                                    />
                                )
                            )
                        } 
                        </>
                        {/* componentes de especialistas */}
                        <>
                        {   comprobacion &&
                                materiasEspecialista.map( value => (
                                    <IndicadoresEspecialista
                                        area={value.materia}
                                        key={value.id} 
                                    />
                                ))                  
                        }
                        </>
                    </div>
                </div>
            }

            <div>
                <button  onClick={ejecutar} className={style.juepa} >
                    Guardar Boleta
                </button>
            </div>
        </>    
    )
}

export default CuerpoBoleta;
