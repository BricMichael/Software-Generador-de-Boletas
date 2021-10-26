import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InicioSesion from '../views/InicioSesion';
import Principal from '../views/Principal';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../views/Sistema/Dashboard/Dashboard';
import Indicadores from '../views/Indicadores/Indicadores';
import PublicRoute from './PublicRoute';
import CrearBoleta from '../views/Sistema/Boletas/CrearBoleta';
import Usuarios from '../views/Sistema/Usuarios/Usuarios';
import DescargarBoleta from '../views/Sistema/Descarga/DescargarBoleta';



const Routes = () => {

    const { isAuthenticated } = useSelector((state) => state.login);


    return (
        <Router>
            <Switch>

                <PrivateRoute path="/menu-principal/registros" isAuthenticated={isAuthenticated} component={Usuarios} />

                <PrivateRoute path="/menu-principal/creacion-de-boletas" isAuthenticated={isAuthenticated} component={CrearBoleta} />

                <PrivateRoute path="/menu-principal/descargar-boleta" isAuthenticated={isAuthenticated} component={DescargarBoleta} />

                <PrivateRoute exact path="/menu-principal" isAuthenticated={isAuthenticated}
                    component={Dashboard} />

                <PrivateRoute exact path="/menu-indicadores" isAuthenticated={isAuthenticated}
                    component={Indicadores} />

                <PublicRoute path="/iniciar-sesion" isAuthenticated={isAuthenticated}
                    component={InicioSesion} />

                <Route path="/" component={Principal} />


            </Switch>
        </Router>
    )
}

export default Routes;
