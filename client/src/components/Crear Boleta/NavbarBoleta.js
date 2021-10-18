import { useRouteMatch, Link } from 'react-router-dom';
import style from './cuerpoBoleta.module.css';



const NavbarBoleta = () => {
    const { url } = useRouteMatch();


    return (
        <div >
            <Link to={url} className={style.linkNavBoletas}>
                Datos Membrete
            </Link>
        </div>
    )
}

export default NavbarBoleta;
