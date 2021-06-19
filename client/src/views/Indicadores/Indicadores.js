// import { indicadoresUserActivo } from "../../api/api";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { allIndicadorOfUser } from "../../Redux/actions/indicadoresActions";
import { colorIndicadores } from "../../helpers/coloresBG";
import Header from "../../components/Header/Header";
import CreaIndicadorDocente from "./CreaIndicadorDocente";
import ListaIndicDocente from './ListaIndicDocente';
import ComentariosEmail from "../../components/ComentsrIndicador/ComentariosEmail";



const Indicadores = () => { 
    colorIndicadores();
    const dispatch = useDispatch();
 
    useEffect(() => {         
       dispatch( allIndicadorOfUser() );
    },[dispatch])

     
    return (
        <>
        {/* <header className={ style.headerlog }>
            <img src={ clogo } className={ style.header_imag } alt='logo de la institucion' />
            <p className={ style.header__title } >Colegio Rep&uacute;blica de Venezuela</p>
        </header> */}
        <Header />
        <CreaIndicadorDocente />
         {/* tiene un margin-top  mostrar dinamicamente si hay datos save in DB */}
         <ListaIndicDocente />
        <ComentariosEmail />

        </>
    );
}

export default Indicadores;
