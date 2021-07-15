import style from "../../components/ComentsrIndicador/comentarios.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { limpiarFormAlActualizar } from "../../Redux/actions/indicadoresActions";
import { backgroundColorPage } from '../../helpers/coloresBG';
import Header from "../../components/Header/Header";
import CreaIndicador from './CreaIndicador'
import ListaIndicadores from "./ListaIndicadores";
import ComentariosEmail from "../../components/ComentsrIndicador/ComentariosEmail";
import BotonHome from "../../components/BotonVolverYSubir/BotonHome";
import OptionsSeeIndicadores from "../../components/Options&Links/OptionsSeeIndicadores";



const Indicadores = () => { 
    backgroundColorPage('#265aac'); 
    document.title = 'Crear Indicador';
    const dispatch = useDispatch();

    const { updateIndicador } = useSelector( state => state.indicador );
    const { rol } = JSON.parse( localStorage.getItem('userActive') );
    
    const cancelEdicion = () => dispatch( limpiarFormAlActualizar() );
    
    return (
        <>

        <BotonHome />
        <Header title='Creación de Indicadores' marginTop='-4.4rem'/>       
        <CreaIndicador />
        
        {
           updateIndicador.estado && 
            ( <div className={ updateIndicador.estado ? `${style.active} animate__animated animate__fadeIn`: style.inactive }>
                <p>Editando indicador</p>
                <button onClick={ cancelEdicion } >Cancelar</button>
            </div>
            )

        }
        <OptionsSeeIndicadores />
        <ListaIndicadores />
        { rol === 'coordinador' && <ComentariosEmail /> }

        </>
    );
}

export default Indicadores;
