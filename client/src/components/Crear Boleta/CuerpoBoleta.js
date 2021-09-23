import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import materiaConIndicadores from "../../helpers/IndicaDocenteBoleta";
import { roles } from "../../helpers/roles";
import style from '../../views/Sistema/Boletas/crearBoleta.module.css';
import Options from "../Options&Links/Options";
import IndicadoresAreas from "./IndicadoresAreas";
import IndicadoresEspecialista from "./IndicadoresEspecialista";



const CuerpoBoleta = () => {
    const { rol } = JSON.parse( localStorage.getItem('userActive') );
  
    const indicadoresByUser = useSelector( state => state.indicador.indicadoresByUser );
    const { materiasDocente, materiasEspecialista } = useSelector( state => state.indicador.materias );
 
    const materiasWithIndic =  rol === roles.docente && materiaConIndicadores(materiasDocente, indicadoresByUser);


    return (
        <>
            <Options vista='Boleta' />
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
                    {   indicadoresByUser.length !== 0
                            &&  materiasWithIndic.map( materia => (
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
                    {   indicadoresByUser.length !== 0
                        &&  materiasEspecialista.map( value => (
                                <IndicadoresEspecialista
                                    area={value.materia}
                                    key={value.id} 
                                />
                            ))                  
                    }
                    </>
                </div>
            </div>

            <div>
                <Link to='/menu-principal/creacion-de-boletas'  className={style.juepa} >
                    Guardar Boleta
                </Link>
            </div>
        </>    
    )
}

export default CuerpoBoleta;
