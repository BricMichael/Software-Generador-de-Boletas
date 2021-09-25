import { useDispatch } from 'react-redux';
import style from "../../components/ComentsEmail/comentarios.module.css";
import { backgroundColorPage } from '../../helpers/coloresBG';
import Header from "../../components/Header/Header";
import { limpiarIndicadores } from "../../Redux/actions/indicadoresActions";
import CreaIndicador from './CreaIndicador'
import ListaIndicadores from "./ListaIndicadores";
import ComentariosEmail from "../../components/ComentsEmail/ComentariosEmail";
import BotonHome from "../../components/BotonVolverYSubir/BotonHome";
import Options from "../../components/Options/Options";
import OptionsCoordinador from "../../components/Options/OptionsCoordinador";
import { roles } from "../../helpers/roles";



const Indicadores = () => { 
    backgroundColorPage('#012c66'); 
    document.title = 'Crear Indicador';

    const dispatch = useDispatch();
    const { rol } = JSON.parse( localStorage.getItem('userActive') ); 
     
    const limpiarState = () => dispatch( limpiarIndicadores() );
    
    return (
        <>
            <BotonHome resetState={ limpiarState } />
            <Header 
            title={ rol === roles.coordinador 
                ? 'Observación de Indicadores' 
                : 'Creación de Indicadores' } 
            marginTop='-4.4rem' 
            /> 

            { rol !== roles.coordinador && 
                <>
                    <CreaIndicador />
                    <Options vista='Indicador' />
                </>
            }

            { rol === roles.coordinador && 
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
