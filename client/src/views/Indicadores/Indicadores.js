import style from "../../components/ComentsrIndicador/comentarios.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { limpiarFormAlActualizar } from "../../Redux/actions/indicadoresActions";
import { backgroundColorPage } from '../../helpers/coloresBG';
import Header from "../../components/Header/Header";
import CreaIndicador from './CreaIndicador'
import ListaIndicadores from "./ListaIndicadores";
import ComentariosEmail from "../../components/ComentsrIndicador/ComentariosEmail";
import BotonHome from "../../components/BotonVolverYSubir/BotonHome";
import Options from "../../components/Options&Links/Options";
import OptionsCoordinador from "../../components/Options&Links/OptionsCoordinador";




const Indicadores = () => { 
    backgroundColorPage('#012c66'); 
    document.title = 'Crear Indicador';
    const dispatch = useDispatch();

    const  stateUpdateIndicador  = useSelector( state => state.indicador.updateIndicador.estado );
    const { rol } = JSON.parse( localStorage.getItem('userActive') );
    
    const cancelEdicion = () => dispatch( limpiarFormAlActualizar() );
    
    return (
        <>

        <BotonHome />
        <Header title={ rol === 'coordinador' ? 'Observación de Indicadores' : 'Creación de Indicadores' } 
        marginTop='-4.4rem' /> 

        { rol !== 'coordinador' && 
            <>
                <CreaIndicador />
                <Options />
            </>
        }
        
        {
           stateUpdateIndicador  && 
             <div className={ `${style.active} animate__animated animate__fadeIn`}>
                <p>Editando indicador</p>
                <button onClick={ cancelEdicion } >Cancelar</button>
            </div>
        }

        { rol === 'coordinador' && 
            <div className={style.estilosCoordinador}>
                <OptionsCoordinador />
                <ComentariosEmail />
            </div>
        }
        <ListaIndicadores />
     
        </>
    );
}

export default Indicadores;
