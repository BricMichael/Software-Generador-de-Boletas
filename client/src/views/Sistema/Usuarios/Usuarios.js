import { Switch, Route, useRouteMatch} from 'react-router-dom';
import BotonHome from '../../../components/BotonVolverYSubir/BotonHome';
import Header from '../../../components/Header/Header';
import image from '../../../assets/img/registro.svg';
import { backgroundColorPage } from '../../../helpers/coloresBG';
import Sidebar from '../../../components/Sidebar/Sidebar';
import EstudianteReg from '../../../components/Registros/EstudianteReg';
import PersonalReg from '../../../components/Registros/PersonalReg';
import TableUsers from '../../../components/Registros/TableUsers';
import UpdateStudents from '../../../components/Registros/UpdateStudents';
import style from './registrosUsers.module.css'
import UpdatePassword from '../../../components/Registros/UpdatePassword';
import TablaMaterias from '../../../components/Registros/TablaMaterias';




const Usuarios = () => {
    backgroundColorPage('#012c66'); 
    document.title = 'Registro de Usuarios';
    let { path } = useRouteMatch();

   
    return (
        <>
            <BotonHome />
            <Header title="Registros"  marginTop='-4.4rem' />
            <div className={style.contentInitial}>
                <Sidebar />
                <img src={image} alt='cargando imagen' className={style.imageSvg}></img>
            </div>

            <Switch>  
                <Route path={`${path}/materias`} exact component={ TablaMaterias } />
                <Route path={`${path}/cambioClave`} exact component={ UpdatePassword } />
                <Route path={`${path}/regUsuario`} exact component={ PersonalReg } />
                <Route path={`${path}/ListaUsuarios`} exact component={ TableUsers} />
                <Route path={`${path}/regEstudiante`} exact component={ EstudianteReg } />
                <Route path={`${path}/ActualizarDatos`} exact component={ UpdateStudents } />
            </Switch>
              <i id='slideDown'></i>
        </>
    )
}

export default Usuarios;
