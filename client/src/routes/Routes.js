import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import InicioSesion from '../views/InicioSesion';
import Principal from '../views/Principal';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../views/Sistema/Dashboard/Dashboard';
import Indicadores from '../views/Indicadores/Indicadores';
import PublicRoute from './PublicRoute';



const Routes = () => {

   const { isAuthenticated } = useSelector((state) => state.login);
  

    return (
        <Router>
            <Switch>
                <PrivateRoute exact  path="/menu-principal" 
                    isAuthenticated={isAuthenticated}  component={ Dashboard } />
                
                <PrivateRoute exact  path="/menu-indicadores" 
                    isAuthenticated={isAuthenticated}  component={ Indicadores } />

                <PublicRoute path="/iniciar-sesion" 
                    isAuthenticated={isAuthenticated}  component={ InicioSesion } />

                <Route path="/" component={ Principal} />
            
                      
            </Switch>          
        </Router>
    )
}

export default Routes;
 