import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import IndicadoresDocente from '../views/Indicadores/IndicadoresDocente';
import InicioSesion from '../views/InicioSesion';
import Principal from '../views/Principal';
import Dashboard from '../views/Sistema/Dashboard/Dashboard';



const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/sistema-indicadores" component={ IndicadoresDocente } />
                <Route exact path='/menuPrincipal' component={ Dashboard } />
                <Route exact path='/InicioSesion' component={ InicioSesion } />
                <Route exact path='/' component={ Principal } />
            </Switch>          
        </Router>
    )
}

export default Routes;
