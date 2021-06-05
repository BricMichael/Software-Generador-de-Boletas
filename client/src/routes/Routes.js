import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Principal from '../Principal';
import InicioSesion from '../views/InicioSesion';
import Dashboard from '../views/Sistema/Dashboard/Dashboard';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/menuPrincipal' component={ Dashboard} />
                <Route exact path='/InicioSesion' component={ InicioSesion} />
                <Route exact path='/' component={ Principal} />
            </Switch>          
        </Router>
    )
}

export default Routes;
