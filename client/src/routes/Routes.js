import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from '../App';
import CargosForm from '../views/CargosForm';
import CoordForm from '../views/CoordForm';
import DepEvaluacionForm from '../views/DepEvaluacionForm';
import DocenteForm from '../views/DocenteForm';
import InicioSesion from '../views/InicioSesion';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/Cargos/DepEvaluacionFormulario' component={ DepEvaluacionForm} />
                <Route exact path='/Cargos/CoordinadorFormulario' component={ CoordForm} />
                <Route exact path='/Cargos/DocenteFormulario' component={ DocenteForm} />
                <Route exact path='/InicioSesion' component={ InicioSesion} />
                <Route exact path='/CargosFormularios' component={ CargosForm } />
                <Route exact path='/' component={ App} />
            </Switch>          
        </Router>
    )
}

export default Routes;
