import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import BotonHome from '../../../components/BotonVolverYSubir/BotonHome';
import { backgroundColorPage } from '../../../helpers/coloresBG';
// import NavbarBoleta from '../../../components/Crear Boleta/NavbarBoleta';
import Cabecera from '../../../components/Crear Boleta/Cabecera';
import CuerpoBoleta from '../../../components/Crear Boleta/CuerpoBoleta';
import { botonCleanData, guardarBoletaAction } from '../../../Redux/actions/boletaActions';
import IndicadoresAreas from '../../../components/Crear Boleta/IndicadoresBoleta/IndicadoresAreas'
import { filtroBusqueda } from '../../../Redux/actions/indicadoresActions'


const CrearBoleta = () => {
    const dispatch = useDispatch();
    const date = useSelector(state => state.boleta.descripAndDate);
    const gradoSeccion = useSelector(state => state.boleta.gradoSeccion);

    backgroundColorPage('#4169e1');
    document.title = 'Crear Boleta';
    const { id } = JSON.parse(localStorage.getItem('userActive'));
    const { path } = useRouteMatch();

    const [indicadoresByPersonal, setIndicadoresByPersonal] = useState({ allIndicadores: [], selectedIndicadores: [] });
    const [boletasGeneradas, setBoletasGeneradas] = useState(0);

    const resetDataBoletaReducer = () => {
        dispatch(botonCleanData());
    }

    const getIndicadoresByPersonal = async () => {
        const datos = await dispatch( filtroBusqueda(date.momento, 'Boleta', id, gradoSeccion.grado) );
        setIndicadoresByPersonal({allIndicadores: datos, selectedIndicadores: datos});
    };

    const removerOrAgregarIndicador = ( accion, idIndicador ) => {
        if ( accion === 'remover' ) {
            const indicadores = indicadoresByPersonal.selectedIndicadores.filter( indicador => indicador.id !== idIndicador );
            return setIndicadoresByPersonal({ ...indicadoresByPersonal, selectedIndicadores: indicadores });
        }

        if ( accion === 'agregar' ) {
            const indicador = indicadoresByPersonal.allIndicadores.find( indicador => indicador.id === idIndicador );
            setIndicadoresByPersonal({ ...indicadoresByPersonal, selectedIndicadores: [ ...indicadoresByPersonal.selectedIndicadores, indicador ] });
        }
    }

    useEffect(() => {
        if( date.finMomento.length > 4 ) getIndicadoresByPersonal();
    }, [date.finMomento, date.momento])

    const registrarBoleta = () => {
        dispatch( guardarBoletaAction(indicadoresByPersonal.selectedIndicadores) );
        setIndicadoresByPersonal({ ...indicadoresByPersonal, selectedIndicadores: indicadoresByPersonal.allIndicadores });
        setBoletasGeneradas(boletasGeneradas + 1);
    };
    
    return (
        <>
            <BotonHome resetState={resetDataBoletaReducer} />
            <Header title="Creación de Boleta" marginTop='-4.4rem' />
            {/* <NavbarBoleta /> */}

            <Switch>
                <Route exact path={`${path}`} component={Cabecera} />
                {/* <Route exact path={`${path}/indicadores-boleta`} component={CuerpoBoleta} /> */}
            </Switch>
            {/* <CuerpoBoleta /> */}
            {
                indicadoresByPersonal.allIndicadores.length > 0 &&
                <>
                    <h2>Verifique Indicadores</h2>
                    <IndicadoresAreas  
                        indicadoresByPersonal={indicadoresByPersonal.allIndicadores} 
                        removerOrAgregarIndicador={removerOrAgregarIndicador}
                        boletasGeneradas={boletasGeneradas}
                    />
                    <button 
                        style={{
                            marginBottom: '1.4rem',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor:'#fff',
                            color: '#4169e1',
                            fontSize: '15px',
                            padding: '8px',
                            borderRadius: '8px'
                        }} 
                        onClick={registrarBoleta}
                    >
                        Registrar Boleta
                    </button>
                </>
            }
        </>
    );
}

export default CrearBoleta;