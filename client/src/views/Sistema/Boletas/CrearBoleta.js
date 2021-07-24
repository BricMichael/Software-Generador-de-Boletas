import style from './crearBoleta.module.css'
import Header from '../../../components/Header/Header';
import BotonHome from '../../../components/BotonVolverYSubir/BotonHome';
import { backgroundColorPage } from '../../../helpers/coloresBG';
import { Link as Scroll } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import materiaConIndicadores from '../../../helpers/IndicaDocenteBoleta';
import BuscarEstudiantes from '../../../components/Crear Boleta/BuscarEstudiantes';
import CabeceraDatosAlumno from '../../../components/Crear Boleta/CabeceraDatosAlumno';
import Options from '../../../components/Options&Links/Options';
import IndicadoresAreas from '../../../components/Crear Boleta/IndicadoresAreas';
import IndicadoresEspecialista from '../../../components/Crear Boleta/IndicadoresEspecialista';
import { guardarBoletaAction } from '../../../Redux/actions/boletaActions';



const CrearBoleta = () => {
    backgroundColorPage('#012c66');
    document.title = 'Crear Boleta';
  
    const dispatch = useDispatch();
    const { rol } = JSON.parse( localStorage.getItem('userActive') );
  
    const indicadoresByUser = useSelector(state => state.indicador.indicadoresByUser);
    const { materiasDocente, materiasEspecialista } = useSelector(state => state.indicador.materias);
 
    const arrayOfMateriasIndicadores =  rol === 'docente' && materiaConIndicadores(materiasDocente, indicadoresByUser);

    const savedBoleta = () => {
        dispatch( guardarBoletaAction() )       
    }

    return (
        <>
            <BotonHome />
            <Header title="Creación de Boleta" marginTop='-4.4rem' />
            <div className={style.firstComponents} id="topOfPage">
                <BuscarEstudiantes />
                <CabeceraDatosAlumno />
            </div>
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
                   <div className={style.separar}>
                    {   indicadoresByUser.length !== 0
                            && 
                            arrayOfMateriasIndicadores.map( materiaDB => (
                                <IndicadoresAreas allIndicadores={ materiaDB} area={materiaDB[0]} key={ materiaDB[0]} />
                            )
                        )
                    } 
                    </div>
                    {/* componentes de especialistas */}
                     <div>
                    {   indicadoresByUser.length !== 0
                        &&  materiasEspecialista.map( value => (
                                <IndicadoresEspecialista 
                                    area={value.materia} 
                                    key={value.materia} 
                                />
                            ))                  
                    }
                    </div>
                </div>

            </div>
            <div className={ style.flexis}>
            <div className={ style.tarjeta }>
                    <div className={ style.parrafAndIcon }>
                        <p className={ style.tarjetaTitle }>Música</p>
                        <i className={ `${style.ICon} fas fa-drum` }></i>
                    </div>
                    <p className={ style.tarjetaParraf }>El estudiante durante el segundo momento realizó de manera óptima las actividades planificadas en el área de música, reconociendo cualidades importantes de la música como: el sonido, melodía, ritmo, y lenguaje musical; adicionalmente identifica la estructura de un compás y sus tipos.</p>
                    <label>E</label>
                    <input type='radio' className={ style.tarjetaInputs }/>
                    <label>B</label>
                    <input type='radio' className={ style.tarjetaInputs }/>
                    <label>RN</label>
                    <input type='radio' className={ style.tarjetaInputs }/>
            </div>
            <div className={ style.tarjeta }>
                    <div className={ style.parrafAndIcon }>
                        <p className={ style.tarjetaTitle }>Música</p>
                        <i className={ `${style.ICon} fas fa-drum` }></i>
                    </div>
                    <p className={ style.tarjetaParraf }>El estudiante durante el segundo momento realizó de manera óptima las actividades planificadas en el área de música, reconociendo cualidades importantes de la música como: el sonido, melodía, ritmo, y lenguaje musical; dicionalmente identifica la estructura de un compás y sus tipos, de igual manera reconoce personajes musicales venezolanos como Aldemaro Romero, mostrando interés en cumplir con todas las actividades asignadas a distancia.</p>
                    <label>E</label>
                    <input type='radio' className={ style.tarjetaInputs }/>
                    <label>B</label>
                    <input type='radio' className={ style.tarjetaInputs }/>
                    <label>RN</label>
                    <input type='radio' className={ style.tarjetaInputs }/>
            </div>
            <div className={ style.tarjeta }>
                    <div className={ style.parrafAndIcon }>
                        <p className={ style.tarjetaTitle }>Música</p>
                        <i className={ `${style.ICon} fas fa-drum` }></i>
                    </div>
                    <p className={ style.tarjetaParraf }>El estudiante durante el segundo momento realizó de manera óptima las actividades planificadas en el área de música, reconociendo cualidades importantes de la música como: el sonido, melodía, ritmo, y lenguaje musical; adicionalmente identifica la estructura de un compás y sus tipos.</p>
                    <label>E</label>
                    <input type='radio' className={ style.tarjetaInputs }/>
                    <label>B</label>
                    <input type='radio' className={ style.tarjetaInputs }/>
                    <label>RN</label>
                    <input type='radio' className={ style.tarjetaInputs }/>
            </div>
            </div>

            {/* <div>
               <Scroll to="topOfPage" smooth="true" duration="1000" className={style.juepa}
                onClick={ savedBoleta }
               >Guardar Boleta
               </Scroll>
            </div> */}
            
        </>
    );
}
//
export default CrearBoleta;
