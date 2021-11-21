import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashBody from '../../../components/DashBody/DashBody';
import styles from './dashboard.module.css';
import { getAndSetFirmasPersonal, materiasExistentes } from '../../../Redux/actions/boletaActions';
import { backgroundColorPage } from '../../../helpers/coloresBG';
import { usuarioLogeado } from '../../../Redux/actions/loginActions';



const Dashboard = () => {
    backgroundColorPage('#eee');
    document.title = 'Menú Principal';
    const dispatch = useDispatch();

    const firmasDirectorCoordinador = useSelector(state => state.boleta.personalFirmas.directora);
    const materias = useSelector(state => state.indicador.materias.materiasDocente);

    materias.length === 0 && dispatch(materiasExistentes());
    firmasDirectorCoordinador === '' && dispatch(getAndSetFirmasPersonal());

    const logoutUser = () => {
        dispatch(usuarioLogeado(false));
        window.localStorage.removeItem('userActive');
    }

    return (
        <>
            <header className={styles.Dashheader}>
                <p className={styles.header_txt}><i className={`fas fa-phone ${styles.fa_phone}`}></i> +58(271)2312877</p>
                <p className={styles.header_txt}>
                    <i className="fas fa-street-view"></i> &nbsp;
                    C #18, entre Av.4 y Bolivariana Sec. Las Acacias, Valera Edo. Trujillo Venezuela
                </p>
            </header>

            <nav className={styles.Dashnavbar}>
                <ul className={styles.Dashul}>
                    <Link to="/menu-indicadores">
                        <li className={styles.ul_items} >
                            <span className={styles.links}><i className="far fa-address-book"></i>&nbsp;&nbsp;Indicadores</span>
                        </li>
                    </Link>
                    <Link to="/menu-principal/creacion-de-boletas">
                        <li className={`${styles.ul_items}`}><span className={styles.links}><i className="fas fa-file-alt"></i>&nbsp;&nbsp; Crear Boleta</span>
                        </li>
                    </Link>

                    <Link to="/menu-principal/descargar-boleta">
                        <li className={`${styles.ul_items}`}><span className={styles.links}>
                            <i className="fas fa-print"></i>&nbsp;&nbsp; Zona de Descargas</span>
                        </li>
                    </Link>

                    <Link to="/menu-principal/registros">
                        <li className={`${styles.ul_items}`}><span className={styles.links}><i className="fas fa-users"></i>&nbsp; Usuarios</span>
                        </li>
                    </Link>

                    <Link to="/menu-principal/registros">
                        <li className={`${styles.ul_items}`}><span className={styles.links}><i className="fas fa-tools"></i>&nbsp;&nbsp; Configuraci&oacute;n</span>
                        </li>
                    </Link>

                    <li className={`${styles.ul_items} ${styles.bg_red}`} onClick={logoutUser}>
                        <button className={styles.links} type="submit"><i className="fas fa-sign-in-alt">
                        </i>&nbsp;&nbsp; Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </nav>
            <DashBody />
        </>
    );
}

export default Dashboard;
