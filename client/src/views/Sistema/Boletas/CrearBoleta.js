import { useDispatch, useSelector } from 'react-redux';
import { Link as Scroll } from 'react-scroll';
import style from './crearBoleta.module.css';
import Header from '../../../components/Header/Header';
import BotonHome from '../../../components/BotonVolverYSubir/BotonHome';
import { backgroundColorPage } from '../../../helpers/coloresBG';
import { roles } from '../../../helpers/roles';
import materiaConIndicadores from '../../../helpers/IndicaDocenteBoleta';
import BuscarEstudiantes from '../../../components/Crear Boleta/BuscarEstudiantes';
import CabeceraDatosAlumno from '../../../components/Crear Boleta/CabeceraDatosAlumno';
import Options from '../../../components/Options&Links/Options';
import IndicadoresAreas from '../../../components/Crear Boleta/IndicadoresAreas';
import IndicadoresEspecialista from '../../../components/Crear Boleta/IndicadoresEspecialista';
import { guardarBoletaAction } from '../../../Redux/actions/boletaActions';



const CrearBoleta = () => {
    backgroundColorPage('#4169e1');
    document.title = 'Crear Boleta';
  
    const dispatch = useDispatch();
    const { rol } = JSON.parse( localStorage.getItem('userActive') );
  
    const indicadoresByUser = useSelector( state => state.indicador.indicadoresByUser );
    const { materiasDocente, materiasEspecialista } = useSelector( state => state.indicador.materias );
 
    const materiasWithIndic =  rol === roles.docente && materiaConIndicadores(materiasDocente, indicadoresByUser);

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
                                    key={value.materia} 
                                />
                            ))                  
                    }
                    </>
                </div>

            </div>

            <div>
               <Scroll to="topOfPage" smooth="true" duration="1000" className={style.juepa}
                onClick={ savedBoleta }
               >Guardar Boleta
               </Scroll>
            </div>
            
        </>
    );
}
//
export default CrearBoleta;
