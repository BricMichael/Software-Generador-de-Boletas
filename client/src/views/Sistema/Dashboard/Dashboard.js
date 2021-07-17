import styles from './dashboard.module.css';
import { useDispatch } from 'react-redux';
import { materiasExistentes } from '../../../Redux/actions/boletaActions';
import { Link} from 'react-router-dom';
import DashBody from '../../../components/DashBody/DashBody';
import { backgroundColorPage } from '../../../helpers/coloresBG';
import { limpiarIndicadores } from '../../../Redux/actions/indicadoresActions';
import { usuarioLogeado } from '../../../Redux/actions/loginActions';




const Dashboard = () => {
        backgroundColorPage('#EEEEEE');
        document.title = 'Menú Principal';
        const dispatch = useDispatch();

        dispatch( materiasExistentes() );
        
        const logoutUser = () =>{
            dispatch( usuarioLogeado(false) );
            localStorage.removeItem('userActive'); 
            dispatch( limpiarIndicadores());
        }
        
    return (
        <>
            <header className={ styles.Dashheader }>
                <p className={ styles.header_txt }><i className={`fas fa-phone ${styles.fa_phone}`}></i> +58(271)2312877</p>
                <p className={ styles.header_txt }><i className="fas fa-street-view"></i> 
                    C #18, entre Av.4 y Bolivariana Sec. Las Acacias, Valera Edo. Trujillo Venezuela
                </p>
            </header>
        
            <nav className={ styles.Dashnavbar }>
                <ul className={ styles.Dashul }>
                    <Link to="/menu-indicadores">
                        <li className={ `${styles.ul_items} ${styles.bg_blue }`} >
                            <span className={ styles.links }><i className="far fa-address-book"></i>&nbsp;&nbsp;Indicadores</span>
                        </li>
                    </Link>
                    <Link to="/menu-principal/creacion-de-boletas">
                        <li className={ `${styles.ul_items}`}><span className={ styles.links }><i className="fas fa-file-alt"></i>&nbsp;&nbsp; Crear Boleta</span>
                        </li>
                    </Link>
                    <li className={ styles.ul_items }><a href="#" className={ styles.links }><i className="fas fa-pen-alt"></i>&nbsp;&nbsp;Editor de Boletas</a></li>
                    <li className={ styles.ul_items }><a href="#" className={ styles.links }><i className="far fa-newspaper"></i>&nbsp;&nbsp;Revisar Boleta</a></li>
                    <li className={ styles.ul_items }><a href="#" className={ styles.links }><i className="fas fa-print"></i>&nbsp;&nbsp; Zona de Descargas</a></li>

                    <Link to="/menu-principal/registros">
                        <li className={ `${styles.ul_items}`}><span className={ styles.links }><i className="fas fa-users"></i>&nbsp; Usuarios</span>
                        </li>
                    </Link>

                    <li className={ styles.ul_items }><a href="#" className={ styles.links }><i className="fas fa-tools"></i>&nbsp;&nbsp; Configuraci&oacute;n</a></li>
                    <li className={ `${styles.ul_items} ${styles.bg_red}`} onClick={logoutUser}><button className={ styles.links } type="submit"><i className="fas fa-sign-in-alt"></i>&nbsp;&nbsp; Cerrar Sesión</button></li>
                </ul>
            </nav>              
            <DashBody />

        </>
    );
}

export default Dashboard;
