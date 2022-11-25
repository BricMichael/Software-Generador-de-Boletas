import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { backgroundColorPage } from "../../helpers/coloresBG"
import style from './cuerpoBoleta.module.css';


const CuerpoBoleta = () => {
    backgroundColorPage('#FFF');
    // const dispatch = useDispatch();
    const history = useHistory();
    const personalFirmas = useSelector(state => state.boleta.personalFirmas);
    const dataBoleta = useSelector(state => state.descarga.dataBoleta);
   
    const boletaDocente = dataBoleta.find( boleta => boleta.docente_boleta );
    const boletasEspecialista = dataBoleta.filter( boleta => boleta.especialista_boleta );
    const indicadoresPorAreaDocente = [];
  
    console.log({boletaDocente, boletasEspecialista}); 
    
   
    for ( let area of boletaDocente.docente_boleta.indicadores ) {
        const existeArea = indicadoresPorAreaDocente.findIndex( value => value?.area === area.area );
        if( existeArea !== -1) {
            indicadoresPorAreaDocente[existeArea].indicadores.push({ indicador: area.indicador });
        } else {
            indicadoresPorAreaDocente.push({
                area: area.area,
                indicadores: [{ indicador: area.indicador }]
            })
        }
    }
    
    const imprimirBoletas = () => {
        setTimeout(() => {
            window.print()
        }, 1900);
        setTimeout(() => {
            history.push("/menu-principal/descargar-boleta");
        }, 5000);
    }
    imprimirBoletas();

    return (
        <div className={style.wrapperBoleta}>
            <div className={style.headBoleta}>
                <h2>PERIODO INTERMEDIO</h2>
                <p>{`(${boletaDocente.mes_momento_inicio} - ${boletaDocente.mes_momento_fin})`} <br/> AREAS DE APRENDIZAJE</p>
            </div>

            <div className={style.wrapperAreasDocente}>
                {
                    indicadoresPorAreaDocente.map( area => (
                        <div className={style.areasDocente} key={area.area}>
                            <div className={style.areaIndividualDocente}>
                                <p className={style.areaTitulo}>{area.area}:</p>
                                <div className={style.indicadoresDocente}>
                                    {area.indicadores.map(i => (
                                        <p key={i.indicador}>✓ &nbsp;{i.indicador}</p>
                                    ))
                                    }                                                           
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className={style.observaciones}>
                Observaciones: {boletaDocente.observacion}
            </div>
            
            {
                boletasEspecialista.map( boleta => (
                    <div className={style.wrapperAreasEspecialista} key={boleta.especialidad}>
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
                                <p>ESPECIALIDAD: {boleta.especialidad}</p>
                                <p>DOCENTE: {boleta?.especialista_boleta?.indicadores[0]?.nombre_docente}</p>
                            </div>
                            <h4>REGISTRO DE EVALUACIÓN {boleta.momento === 'momento 1' ? 'I' : boleta.momento === 'momento 2' ? 'II' : 'III'} MOMENTO AÑO ESCOLAR {boleta.anio_escolar}</h4>
                        </div>

                        <div className={style.proposito_general}>
                            <p>
                                <b>SALA:</b> {boleta.grado === 'nivel1' ? '3' : boleta.grado === 'nivel2' ? '4' : '5'} años <b>SECCIÓN:</b> {boleta.seccion} <b>PROPÓSITO GENERAL:</b> {boleta?.especialista_boleta?.indicadores[1]?.proposito_general}
                            </p>
                        </div>

                        <div className={style.nombre_estudiante}>
                            <p>Apellidos y Nombres: {boleta.nombre_estudiante}</p>
                        </div>

                        <div className={style.wrapperIndicador}>
                            <div className={style.momento}>
                                <p>Evaluación Descriptiva del {boleta.momento === 'momento 1' ? 'Primer' : boleta.momento === 'momento 2' ? 'Segundo' : 'Tercer'} Momento</p>
                            </div>
                            <p className={style.indicador_descripcion}>
                            {boleta?.especialista_boleta?.indicadores[0]?.indicador}
                            </p>
                        </div>

                        <div className={style.nota_wrapper}>
                            <h3>NOTA:</h3>
                            <div></div>
                        </div>    

                        <div className={style.firmas_wrapper}>
                        <div className={style.firmas}>  
                                <div></div>
                                <p>Lic. {boleta?.especialista_boleta?.indicadores[0]?.nombre_docente}</p>
                                <p>Prof. de {boleta.especialidad}</p>
                        </div>
                        <div className={style.firmas}> 
                                <div></div>
                                <p>Lic. {personalFirmas?.directora}</p>
                                <p>Directora</p>
                        </div>
                        <div className={style.firmas}> 
                                <div></div>
                                <p>Lic. {personalFirmas?.coordinadora}</p>
                                <p>Coordinadora</p>
                        </div>
                        </div>
                    </div> 
                ))
            }           
        </div>
    )
}

export default CuerpoBoleta;
