import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import materiaConIndicadores from "../../helpers/IndicaDocenteBoleta";
import { guardarBoletaAction } from "../../Redux/actions/boletaActions";
import types from "../../Redux/types";
import Options from "../Options/Options";
import style from './cuerpoBoleta.module.css';
import IndicadoresAreas from "./IndicadoresBoleta/IndicadoresAreas";
import IndicadoresEspecialista from "./IndicadoresBoleta/IndicadoresEspecialista";




const CuerpoBoleta = () => {
    // history.push('/menu-principal/creacion-de-boletas')
    const dispatch = useDispatch();
    // const history = useHistory();
    const indicadoresByUser = useSelector(state => state.boleta.indicadoresByUser);
    const materiasWithIndic = useSelector(state => state.boleta.materiasWithIndicadores);
    const withData = useSelector(state => state.boleta.indicadoresByUserWithData);
    const { materiasDocente, materiasEspecialista } = useSelector(state => state.indicador.materias);


    const [loadingData, setLoadingData] = useState(false);


    let comprobacion = indicadoresByUser.length > 0;

    useEffect(() => {
        if (!withData && comprobacion) {
            const data = materiaConIndicadores(materiasDocente, indicadoresByUser, 'Cuerpo Boleta');
            console.log('usefect solo una')
            dispatch({ type: types.checkLlegaronDatos, payload: data });// withData se actualiza en TRUE para que la llamada a la funcion no se ejecute cada que se rendirice el componente gracias a la condicion, y en el payload se manda el retorno de la funcion y de esta manera los datos siempre seran leidos del estado global en cada render y no de una nueva llamada a la funcion.
        }
    }, [indicadoresByUser])



    const ejecutar = () => {
        dispatch(guardarBoletaAction());
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
                        <p className={style.leyendaTitulos}><b>E:</b> Excelente</p>
                        <p className={style.leyendaTitulos}><b>B:</b> Bien</p>
                        <p className={style.leyendaTitulos}><b>RN:</b> Requiere nivelaci&oacute;n</p>
                    </div>
                    <div className={style.derechita}>
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

                        {/* componentes de especialistas */}
                        {comprobacion &&
                            materiasEspecialista.map(value => (
                                <IndicadoresEspecialista
                                    area={value.materia}
                                    key={value.id}
                                />
                            ))
                        }
                    </div>
                </div>
            }

            {comprobacion &&
                <div>
                    <button onClick={ejecutar} className={style.juepa} >
                        Guardar Boleta
                    </button>
                </div>
            }
        </>
    )
}

export default CuerpoBoleta;
