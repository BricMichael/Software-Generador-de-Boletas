// import Modal from "../../components/Modal";
import style from './crearIndicador.module.css';
import clogo from '../../assets/img/colegioLogo.png';
import { colorIndicadores } from "../../helpers/coloresBG";
import CreaIndicadorDocente from "./CreaIndicadorDocente";
import ListaIndicDocente from "./ListaIndicDocente";


const IndicadoresDocente = () => { 
    colorIndicadores();

    return (
        <>
        <header className={ style.headerlog }>
            <img src={ clogo } className={ style.header_imag } alt='logo de la institucion' />
            <p className={ style.header__title } >Colegio Rep&uacute;blica de Venezuela</p>
        </header>

        <CreaIndicadorDocente />

        <ListaIndicDocente /> 
        {/* tiene un margin-top */}
        </>
    );
}

export default IndicadoresDocente;
