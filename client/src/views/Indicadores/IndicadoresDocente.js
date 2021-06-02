// import Modal from "../../components/Modal";
import { colorIndicadores } from "../../helpers/coloresBG";
import CreaIndicadorDocente from "./CreaIndicadorDocente";
import ListaIndicDocente from "./ListaIndicDocente";
import ComentariosEmail from '../../components/ComentariosEmail';
import Header from '../../components/Header';


const IndicadoresDocente = () => { 
    colorIndicadores();

    return (
        <>
        {/* <header className={ style.headerlog }>
            <img src={ clogo } className={ style.header_imag } alt='logo de la institucion' />
            <p className={ style.header__title } >Colegio Rep&uacute;blica de Venezuela</p>
        </header> */}
        <Header />
        <CreaIndicadorDocente />
        <ListaIndicDocente /> {/* tiene un margin-top  mostrar dinamicamente si hay datos save in DB */}
        <ComentariosEmail />

        </>
    );
}

export default IndicadoresDocente;
