import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import BotonHome from '../../../components/BotonVolverYSubir/BotonHome';
import { backgroundColorPage } from '../../../helpers/coloresBG';
import NavbarBoleta from '../../../components/Crear Boleta/NavbarBoleta';
import Cabecera from '../../../components/Crear Boleta/Cabecera';
import CuerpoBoleta from '../../../components/Crear Boleta/CuerpoBoleta';
import { botonCleanData } from '../../../Redux/actions/boletaActions';


const CrearBoleta = () => {
    const dispatch = useDispatch();
    backgroundColorPage('#4169e1');
    document.title = 'Crear Boleta';
    const { path } = useRouteMatch();

    const resetDataBoletaReducer = () => {
        dispatch(botonCleanData());
    }

    return (
        <>
            <BotonHome resetState={resetDataBoletaReducer} />
            <Header title="Creación de Boleta" marginTop='-4.4rem' />
            <NavbarBoleta />

            <Switch>
                <Route exact path={`${path}`} component={Cabecera} />
                <Route exact path={`${path}/indicadores-boleta`} component={CuerpoBoleta} />
            </Switch>
        </>
    );
}

export default CrearBoleta;




// {/* <div className={style.firstComponents} id="topOfPage">
// <BuscarEstudiantes />
// <CabeceraDatosAlumno />
// </div>
// <Options vista='Boleta' />

// <div className={ style.display }>
// <h2>Indicadores</h2>
// <div className={ style.leyendaFlex }>
//     <h3 className={ style.leyendaTitulos }>Leyenda:</h3>
//     <p className={ style.leyendaTitulos }><b>E:</b> Exelente</p>
//     <p className={ style.leyendaTitulos }><b>B:</b> Bien</p>
//     <p className={ style.leyendaTitulos }><b>RN:</b> Requiere nivelaci&oacute;n</p>
// </div>
// <div className={style.derechita}>
//     <>
//     {   indicadoresByUser.length !== 0
//             &&  materiasWithIndic.map( materia => (
//                     <IndicadoresAreas 
//                         key={ materia.area} 
//                         allIndicadores={ materia.indicadores} 
//                         area={ materia.area }    
//                     />
//                 )
//         )
//     } 
//     </>
//     {/* componentes de especialistas */}
//      <>
//     {   indicadoresByUser.length !== 0
//         &&  materiasEspecialista.map( value => (
//                 <IndicadoresEspecialista 
//                     area={value.materia}
//                     key={value.id} 
//                 />
//             ))                  
//     }
//     </>
// </div>

// </div>

// <div>
// <Scroll to="topOfPage" smooth="true" duration="1000" className={style.juepa}
// onClick={ savedBoleta }
// >Guardar Boleta
// </Scroll>
// </div> */}