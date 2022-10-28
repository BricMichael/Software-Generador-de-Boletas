import { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import style from './sidebar.module.css';
import ModalDeleteStudents from '../Modal/ModalDeleteStudents';
import { roles } from '../../helpers/roles';
import DeleteBoleta from '../Modal/DeleteBoleta';
import DeleteAllBoletas from '../Modal/DeleteAllBoletas';

const Sidebar = () => {
    let { url } = useRouteMatch();
    const [modalStudents, setModalStudents] = useState(false);
    const [modalDeleteBoleta, setModalDeleteBoleta] = useState(false);
    const [modalDeleteAllBoletas, setModalDeleteAllBoletas] = useState(false);

    const rolUser = JSON.parse(localStorage.getItem('userActive')).rol;

    return (
        <>
            {modalStudents && <ModalDeleteStudents closeModal={setModalStudents} />}
            {modalDeleteBoleta && <DeleteBoleta closeModal={setModalDeleteBoleta} />}
            {modalDeleteAllBoletas && <DeleteAllBoletas closeModal={setModalDeleteAllBoletas} />}

            <div className={style.sidebarContent}>
                <span className={style.sidebarTitle}>Registro Estudiante</span>
                <ul className={style.sidebarContentUl}>
                    <Link to={`${url}/regEstudiante`}>Registrar Estudiante</Link>
                    <Link to={`${url}/ActualizarDatos`}>Actualizar datos</Link>
                    <Link to={`${url}/materias`}>Agregar Materias</Link>
                </ul>
                {
                    (rolUser !== roles.docente && rolUser !== roles.especialista)
                    && <>
                        <span className={style.sidebarTitle}>Registros Personal</span>
                        <ul className={style.sidebarContentUl}>
                            <Link to={`${url}/regUsuario`}>Registrar Usuario</Link>
                            <Link to={`${url}/ListaUsuarios`}>Lista de Usuarios</Link>
                            <Link to={`${url}/cambioClave`}>Cambiar contraseña</Link>
                        </ul>

                        <span className={style.sidebarTitle}>Configuración</span>
                        <ul className={style.sidebarContentUl}>                 
                            <li onClick={() => setModalStudents(true)} style={{ cursor: 'pointer' }} >Eliminar Estudiantes</li>
                            {
                                rolUser === roles.admin &&
                                <>
                                    <li onClick={() => setModalDeleteBoleta(true)} style={{ cursor: 'pointer' }} >
                                        Eliminar Boleta
                                    </li>
                                    <li onClick={() => setModalDeleteAllBoletas(true)} style={{ cursor: 'pointer' }}>
                                        Eliminar Boletas
                                    </li>
                                </>
                            }
                        </ul>
                    </>
                }
            </div>
        </>
    )
}

export default Sidebar;
