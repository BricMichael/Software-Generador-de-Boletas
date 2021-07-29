import style from './sidebar.module.css';
import { Link, useRouteMatch } from 'react-router-dom';

const Sidebar = () => {
    let { url } = useRouteMatch();

    return (
        <div className={ style.sidebarContent }>
            <span className={ style.sidebarTitle }>Registro Estudiante</span>
            <ul className={ style.sidebarContentUl }>
                <Link to={`${url}/regEstudiante`}>Registrar Estudiante</Link>
                <Link to={`${url}/ActualizarDatos`}>Actualizar datos</Link>
            </ul>

            <span className={ style.sidebarTitle}>Registros Personal</span>
            <ul className={ style.sidebarContentUl }>
                <Link to={`${url}/regUsuario`}>
                    Registrar Usuario
                </Link>
                <Link to={`${url}/ListaUsuarios`}>
                    Lista de Usuarios
                </Link>
                <Link to='/a'>Cambiar contraseña *</Link>
            </ul>
        </div>
    )
}

export default Sidebar;
