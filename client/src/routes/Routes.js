import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Principal from '../Principal';
import IndicadoresDocente from '../views/Indicadores/IndicadoresDocente';
import InicioSesion from '../views/InicioSesion';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/indicadoresDocente' component={ IndicadoresDocente} />
                <Route exact path='/InicioSesion' component={ InicioSesion} />
                <Route exact path='/' component={ Principal} />
            </Switch>          
        </Router>
    )
}

export default Routes;
