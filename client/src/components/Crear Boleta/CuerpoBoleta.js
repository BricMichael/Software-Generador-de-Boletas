import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import materiaConIndicadores from "../../helpers/IndicaDocenteBoleta";
import { guardarBoletaAction } from "../../Redux/actions/boletaActions";
import Options from "../Options/Options";
import style from './cuerpoBoleta.module.css';
import IndicadoresAreas from "./IndicadoresBoleta/IndicadoresAreas";
import IndicadoresEspecialista from "./IndicadoresBoleta/IndicadoresEspecialista";




const CuerpoBoleta = () => {
    // history.push('/menu-principal/creacion-de-boletas')
    const dispatch = useDispatch();
    const history = useHistory();
    const indicadoresByUser = useSelector(state => state.indicador.indicadoresByUser);
    const { materiasDocente, materiasEspecialista } = useSelector(state => state.indicador.materias);
    const [loadingData, setLoadingData] = useState(false);

    let comprobacion = indicadoresByUser.length > 0;

    const materiasWithIndic = comprobacion && materiaConIndicadores(materiasDocente, indicadoresByUser, 'Cuerpo Boleta');

    const ejecutar = () => {
        dispatch(guardarBoletaAction(materiasDocente))

    }

    return (
        <>
            <Options vista='Boleta' loadingData={setLoadingData} />
            {loadingData && <p className='loadingMsg'>Cargando...</p>}
            {
                comprobacion &&
                <div className={style.display}>
                    <h2>Indicadores</h2>
                    <div className={style.leyendaFlex}>
                        <h3 className={style.leyendaTitulos}>Leyenda:</h3>
                        <p className={style.leyendaTitulos}><b>E:</b> Exelente</p>
                        <p className={style.leyendaTitulos}><b>B:</b> Bien</p>
                        <p className={style.leyendaTitulos}><b>RN:</b> Requiere nivelaci&oacute;n</p>
                    </div>
                    <div className={style.derechita}>
                        <>
                            {comprobacion &&
                                materiasWithIndic.map(materia => (
                                    materia.indicadores.length >= 1 &&
                                    <IndicadoresAreas
                                        key={materia.area}
                                        allIndicadores={materia.indicadores}
                                        area={materia.area}
                                    />
                                ))
                            }
                        </>
                        {/* componentes de especialistas */}
                        <>
                            {comprobacion &&
                                materiasEspecialista.map(value => (
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

            {comprobacion &&
                <div>
                    <button onClick={ejecutar} className={style.juepa} >
                        Guardar Boleta
                    </button>
                </div>}
        </>
    )
}

export default CuerpoBoleta;
