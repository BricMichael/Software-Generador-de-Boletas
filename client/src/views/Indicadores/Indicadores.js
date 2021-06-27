import style from "../../components/ComentsrIndicador/comentarios.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { allIndicadorOfUser, limpiarFormAlActualizar } from "../../Redux/actions/indicadoresActions";
import { backgroundColorPage } from '../../helpers/coloresBG';
import Header from "../../components/Header/Header";
import CreaIndicador from './CreaIndicador'
import ListaIndicadores from "./ListaIndicadores";
import ComentariosEmail from "../../components/ComentsrIndicador/ComentariosEmail";



const Indicadores = () => { 
    backgroundColorPage('#265aac'); 
    const dispatch = useDispatch();

    const { estado } = useSelector( state => state.indicador.updateIndicador );
    const { rol } = JSON.parse( localStorage.getItem('userActive') );

    useEffect(() => {        
        dispatch( allIndicadorOfUser() );
    },[dispatch])

    const cancelEdicion = () => {
        dispatch( limpiarFormAlActualizar() );
    }

    return (
        <>
        {/* <header className={ style.headerlog }>
            <img src={ clogo } className={ style.header_imag } alt='logo de la institucion' />
            <p className={ style.header__title } >Colegio Rep&uacute;blica de Venezuela</p>
        </header> */}
        <Header />
        <CreaIndicador />
        {
            estado && 
            ( <div className={ estado ? `${style.active} animate__animated animate__fadeIn`: style.inactive }>
                <p>Editando el indicador seleccionado</p>
                <button onClick={ cancelEdicion } >Cancelar</button>
            </div>
            )

        }
        <ListaIndicadores />
        { rol === 'coordinador' && <ComentariosEmail /> }

        </>
    );
}

export default Indicadores;
