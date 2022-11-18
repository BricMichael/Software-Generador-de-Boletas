import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import materiaConIndicadores from "../../helpers/creacionBoleta";
import { guardarBoletaAction } from "../../Redux/actions/boletaActions";
import types from "../../Redux/types";
import Options from "../Options/Options";
import style from './cuerpoBoleta.module.css';
import IndicadoresAreas from "./IndicadoresBoleta/IndicadoresAreas";
import IndicadoresEspecialista from "./IndicadoresBoleta/IndicadorIndividual";




const CuerpoBoleta = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const indicadoresByUser = useSelector(state => state.boleta.indicadoresByUser);
    const materiasWithIndic = useSelector(state => state.boleta.materiasWithIndicadores);
    const withData = useSelector(state => state.boleta.indicadoresByUserWithData);
    const { materiasDocente, materiasEspecialista } = useSelector(state => state.indicador.materias);

    const [loadingData, setLoadingData] = useState(false);
    let comprobacion = indicadoresByUser.length > 0;

    // useEffect(() => {
    //     if (!withData && comprobacion) {
    //         const data = materiaConIndicadores(materiasDocente, indicadoresByUser, 'Cuerpo Boleta');
    //         dispatch({ type: types.checkLlegaronDatos, payload: data });// withData se actualiza en TRUE para que la llamada a la funcion no se ejecute cada que se rendirice el componente gracias a la condicion, y en el payload se manda el retorno de la funcion y de esta manera los datos siempre seran leidos del estado global en cada render y no de una nueva llamada a la funcion.
    //     }
    // }, [indicadoresByUser])


    const ejecutar = () => {
        dispatch(guardarBoletaAction(history));
    }

    return (
        <div className={style.wrapperBoleta}>
            <div className={style.headBoleta}>
                <h2>PERIODO INTERMEDIO</h2>
                <p>(ENERO – MARZO) <br/> AREAS DE APRENDIZAJE</p>
            </div>

            <div className={style.wrapperAreasDocente}>
                <div className={style.areasDocente}>
                    <div className={style.areaIndividualDocente}>
                        <p className={style.areaTitulo}>Formación Personal y Social:</p>
                        <div className={style.indicadoresDocente}>
                            <p>✓ &nbsp;Responde al llamado de su nombre con una mirada.</p>
                            <p>✓ &nbsp;Se encuentra en proceso de reconocimiento del esquema corporal.</p>
                            <p>✓ &nbsp;Observa imágenes de niño y niña, con apoyo señala la imagen del niño e identifica su género.</p>
                            <p>✓ &nbsp;Reconoce y ubica sus pertenencias.</p>
                            <p>✓ &nbsp;Manifiesta sus gustos y preferencias por medio de un gesto o berrinche.</p>
                            <p>✓ &nbsp;Responde a muestras de cariño y afecto.</p>
                        </div>
                    </div>
                </div>

                <div className={style.areasDocente}>
                    <div className={style.areaIndividualDocente}>
                        <p className={style.areaTitulo}>Relación con el ambiente:</p>
                        <div className={style.indicadoresDocente}>
                            <p>✓ Cambia la forma y organización de diversos materiales de su entorno: arruga, tuerce, apila y envuelve.</p>
                            <p>✓ Señala secuencialmente el símbolo gráfico de los números del 1 al 10.</p>
                            <p>✓ Escribe los números del 1 al 10 guiándose por un patrón de puntos.</p>
                            <p>✓ Agrupa objetos según atributos (tamaño-color-forma).</p>
                            <p>✓ Con apoyo de la maestra hace relación de número-cantidad.</p>
                            <p>✓ Ordena varias cosas una después de la otra.</p>
                            <p>✓ Arma rompecabezas de las partes del cuerpo humano.</p>
                        </div>
                    </div>
                </div>

                <div className={style.areasDocente}>
                    <div className={style.areaIndividualDocente}>
                        <p className={style.areaTitulo}>Comunicación y Representación:</p>
                        <div className={style.indicadoresDocente}>
                            <p>✓ Se comunica a través de gestos, el cuerpo o escasas palabras (mamá, papá, no).</p>
                            <p>✓ Está adquiriendo independencia con referencia a utilizar goma y sacapuntas.</p>
                            <p>✓ Con apoyo de la maestra realiza recorte de líneas rectas y curvas.</p>
                            <p>✓ Escribe en forma libre: rayas, garabateo, bolitas y palitos.</p>
                            <p>✓ Realiza trazos en distintas formas lineales (horizontal, vertical, diagonal, curva, zig-zag).</p>
                            <p>✓ Utiliza apoyo visual y oral para realizar la escritura de su nombre, así como también lo arma con letras de foami o mdf.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.observaciones}>
                Observaciones: Muy Bien, se recomienda modificación de la conducta para
                disminuir y eliminar ciertos comportamientos (juego con saliva, estar parado
                constantemente) aumentando las habilidades de permanecer centrado en las
                actividades y evitar interrupciones. 
            </div>

            <div className={style.wrapperAreasEspecialista}>
                <div className={style.membrete}>
                    <p>
                        REPÚBLICA BOLIVARIANA DE VENEZUELA <br />
                        MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN <br />
                        COLEGIO “REPÚBLICA DE VENEZUELA” <br />
                        VALERA ESTADO TRUJILLO
                    </p>
                </div>

                <div className={style.firtsData}>
                    <div className={style.topfirtsData}>
                        <p>ESPECIALIDAD: Inglés</p>
                        <p>DOCENTE: Deiber Jiménez</p>
                    </div>
                    <h4>REGISTRO DE EVALUACIÓN II MOMENTO AÑO ESCOLAR 2020-2021</h4>
                </div>

                <div className={style.proposito_general}>
                    <p>
                        <b>SALA:</b> 4 años <b>SECCIÓN:</b> A <b>PROPÓSITO GENERAL:</b> Reconocer los colores en
                        francés y vocabulario básico en el idioma como herramienta de apoyo y de estudio
                        durante el segundo momento del año escolar 2020-2021 cumpliendo con la
                        modalidad cada familia, una escuela, como medida preventiva ante el COVID-19.
                    </p>
                </div>

                <div className={style.nombre_estudiante}>
                    <p>Apellidos y Nombres: Suarez Delgado Orlando</p>
                </div>

                <div className={style.wrapperIndicador}>
                    <div className={style.momento}>
                        <p>Evaluación Descriptiva del Segundo Momento</p>
                    </div>
                    <p className={style.indicador_descripcion}>
                        Durante el segundo momento el estudiante desarrolló las actividades
                        asignadas en la especialidad de inglés en su totalidad, realizó las mismas
                        de manera creativa y ordenada en el tiempo establecido a la misma
                        forma que trabajó con diferentes técnicas los números del 1 al 10, los
                        colores (amarillo, azul, rojo, verde y anaranjado), vocabulario de figuras
                        geométricas (círculo, triangulo y cuadrado) cabe destacar que
                        demostró excelente desempeño y empatía para con la especialidad.
                    </p>
                </div>

                <div className={style.nota_wrapper}>
                    <h3>NOTA:</h3>
                    <div></div>
                </div>    

                <div className={style.firmas_wrapper}>
                   <div className={style.firmas}>  
                        <div></div>
                        <p>Lic. Deiber Jiménez</p>
                        <p>Prof. de Inglés</p>
                   </div>
                   <div className={style.firmas}> 
                        <div></div>
                        <p>Lic. Deiber Jiménez</p>
                        <p>Prof. de Inglés</p>
                   </div>
                   <div className={style.firmas}> 
                        <div></div>
                        <p>Lic. Deiber Jiménez</p>
                        <p>Prof. de Inglés</p>
                   </div>
                </div>

            </div>
            
        </div>
    )
}

export default CuerpoBoleta;
