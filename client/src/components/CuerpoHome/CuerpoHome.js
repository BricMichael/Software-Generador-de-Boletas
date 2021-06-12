import estilos from './cuerpoHome.module.css';
import logodevs from '../../assets/img/logoDevs.jpg';
import { Link } from 'react-router-dom';


const CuerpoHome = () => {
    
    return (
        <>
            <div >
                <h1 className={ estilos.welcome_title } >BIENVENIDOS A</h1>
                <img src={ logodevs } className={ estilos.welcomeHome_img } alt='logo de los desarrolladores del sistema' />
            </div>

            <div className={ estilos.Homebuttons }>
                <Link to='/iniciar-sesion' className={ estilos.Home_primaryLinks } id='btn-inicio'>Iniciar Sesi&oacute;n</Link>
            </div>
        </>
    );
}

export default CuerpoHome;
