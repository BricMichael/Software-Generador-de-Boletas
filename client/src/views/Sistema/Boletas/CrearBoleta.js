import style from './crearBoleta.module.css'
import Header from '../../../components/Header/Header';
import BotonHome from '../../../components/BotonVolverYSubir/BotonHome';
import { backgroundColorPage } from '../../../helpers/coloresBG';
import { Link as Scroll } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import materiaConIndicadores from '../../../helpers/IndicaDocenteBoleta';
import BuscarEstudiantes from '../../../components/Crear Boleta/BuscarEstudiantes';
import CabeceraDatosAlumno from '../../../components/Crear Boleta/CabeceraDatosAlumno';
import IndicadoresAreas from '../../../components/Crear Boleta/IndicadoresAreas';
import IndicadoresEspecialista from '../../../components/Crear Boleta/IndicadoresEspecialista';
import { guardarBoletaAction } from '../../../Redux/actions/boletaActions';
import Options from '../../../components/Options&Links/Options';


const CrearBoleta = () => {
    backgroundColorPage('#012c66');
    document.title = 'Crear Boleta';
  
    const dispatch = useDispatch();
    const { rol } = JSON.parse( localStorage.getItem('userActive') );
    const grado = useSelector( state => state.boleta.grado );

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
            <div className={style.firstComponents} id="hola">
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
                    {   arrayOfMateriasIndicadores 
                            && 
                            arrayOfMateriasIndicadores.map( materiaDB => (
                                <IndicadoresAreas allIndicadores={ materiaDB} area={materiaDB[0]} key={ materiaDB[0]} />
                            )
                        )
                    } 
                    </div>
                    {/* componentes de especialistas */}
                     <div>
                    {   grado !== '' &&  materiasEspecialista.map( value => (
                            <IndicadoresEspecialista area={value.materia} key={value.materia} />
                        ))                  
                    }
                    </div>
                </div>

            </div>

            <div>
               <Scroll to="hola" smooth="true" duration="1000" className={style.juepa}
                onClick={ savedBoleta }
               >Guardar Boleta
               </Scroll>
            </div>
            
        </>
    );
}
//
export default CrearBoleta;
