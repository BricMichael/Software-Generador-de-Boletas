import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../../views/Sistema/Dashboard/dashboard.module.css';
import Header from '../Header/Header';
import { showMenuByRol } from '../../helpers/coloresBG';
import { usuarioLogeado } from '../../Redux/actions/loginActions';



const DashBody = () => {
    const dispatch = useDispatch();
    const { nombre, rol } = JSON.parse(window.localStorage.getItem('userActive')) // data formateada a json

    const logoutUser = () => {
        dispatch(usuarioLogeado(false));
        window.localStorage.removeItem('userActive');
    }

    return (
        <main className={styles.main_container}>
            <Header color='#2255a4' />
            <section className={styles.accesos}>
                <div className={styles.all_links}>
    

                    {
                        showMenuByRol(rol).map(enlace => (
                            <Link to={enlace.to} key={enlace.styleIcon}
                                className={enlace.className}>
                                <i className={enlace.styleIcon}></i>
                                <p className={enlace.pStyle}>{enlace.p}</p>
                            </Link>
                        ))
                    }
                    <button type='submit' className={`${styles.cl_red} ${styles.grupo}`} style={{ border: 'none' }} onClick={logoutUser}>
                        <i className={`${styles.bg} fas fa-sign-in-alt`}></i>
                        <p className={styles.opciones}>Cerrar sesión</p>
                    </button>

                    <div className={styles.user}>
                        <div className={styles.avatar_name_footer}>
                            <img src='/avatar-hombre.png' alt='Avatar Perfil' />
                            <p>{nombre ? nombre : ''}</p>
                        </div>                        
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DashBody;
