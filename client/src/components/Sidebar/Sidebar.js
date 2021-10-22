import style from './sidebar.module.css';
import { Link, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import ModalDeleteStudents from '../Modal/ModalDeleteStudents';


const Sidebar = () => {
    let { url } = useRouteMatch();
    const [openModal, setOpenModal] = useState(false);


    return (
        <>
            {openModal && <ModalDeleteStudents closeModal={setOpenModal} />}
            <div className={style.sidebarContent}>
                <span className={style.sidebarTitle}>Registro Estudiante</span>
                <ul className={style.sidebarContentUl}>
                    <Link to={`${url}/regEstudiante`}>Registrar Estudiante</Link>
                    <Link to={`${url}/ActualizarDatos`}>Actualizar datos</Link>
                </ul>

                <span className={style.sidebarTitle}>Registros Personal</span>
                <ul className={style.sidebarContentUl}>
                    <Link to={`${url}/regUsuario`}>Registrar Usuario</Link>
                    <Link to={`${url}/ListaUsuarios`}>Lista de Usuarios</Link>
                    <Link to={`${url}/cambioClave`}>Cambiar contraseña</Link>
                </ul>

                <span className={style.sidebarTitle}>Configuración</span>
                <ul className={style.sidebarContentUl}>
                    <Link to={`${url}/materias`}>Agregar Materias</Link>
                    <li onClick={() => setOpenModal(true)} style={{ cursor: 'pointer' }} >Eliminar Estudiantes</li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar;
