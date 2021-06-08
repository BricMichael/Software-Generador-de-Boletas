import estilos from './cuerpoHome.module.css';
import logodevs from '../../assets/img/logoDevs.jpg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { obtenerUsuarios } from '../../Redux/actions/loginActions';


const CuerpoHome = () => {
    const dispatch = useDispatch()

    const handleAllUsers = () => {
        dispatch( obtenerUsuarios() )
    }

    return (
        <>
            <div >
                <h1 className={ estilos.welcome_title } >BIENVENIDOS A</h1>
                <img src={ logodevs } className={ estilos.welcomeHome_img } alt='logo de los desarrolladores del sistema' />
            </div>

            <div className={ estilos.Homebuttons }>
                <Link to='/InicioSesion' className={ estilos.Home_primaryLinks } onClick={handleAllUsers} id='btn-inicio'>Iniciar Sesi&oacute;n</Link>
                <Link to='/menuPrincipal' className={ estilos.Home_primaryLinks } id='btn-registrate'>Reg&iacute;strate</Link>
            </div>
        </>
    );
}

export default CuerpoHome;
