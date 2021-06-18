import { indicadoresUserActivo } from "../../api/api";
import { useEffect, useMemo } from "react";
import { indicadoresUser} from "../../Redux/actions/indicadoresActions";
import { useDispatch } from 'react-redux';
import Header from "../../components/Header/Header";
import { colorIndicadores } from "../../helpers/coloresBG";
import CreaIndicadorDocente from "./CreaIndicadorDocente";
import ListaIndicDocente from './ListaIndicDocente';
import ComentariosEmail from "../../components/ComentsrIndicador/ComentariosEmail";




const Indicadores = () => { 
    colorIndicadores();
    const dispatch = useDispatch();

    const memorizar = useMemo(() => async(nombre) => {
        let { data } = await indicadoresUserActivo( {usuario: nombre} );
        dispatch( indicadoresUser( data ) );

        return data;
    }, [dispatch])
 
    // abajo la funcion incial
    
    useEffect(() => {         
        const { nombre } = JSON.parse( localStorage.getItem('userActive') );
        memorizar(nombre)
    },[memorizar])

     
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


// const obtenerIndicadoresUser = async ( nombre ) => {
//     let { data } = await indicadoresUserActivo( {usuario: nombre} );
//     dispatch( indicadoresUser( data ) );
// }