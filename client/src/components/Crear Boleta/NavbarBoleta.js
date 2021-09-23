import { useRouteMatch, Link }from 'react-router-dom';

const NavbarBoleta = () => {
    const { url } = useRouteMatch();


    return (
        <div>
            <Link to={ url }>
                Datos Membrete
            </Link>

            <Link to={`${url}/indicadores-boleta`}>
                Indicadores boleta
            </Link>
        </div>
    )
}

export default NavbarBoleta;
