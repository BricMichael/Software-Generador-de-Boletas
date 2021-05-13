import estilo from './header.module.css';
import clogo from '../assets/img/colegioLogo.png';

const Header = () => {
    return (
        <>
            <header className={ estilo.headerlog }>
                <img src={ clogo } className={ estilo.header_imag } alt='logo de la institucion' />
                <p className={ estilo.header__title }>Colegio Rep&uacute;blica de Venezuela</p>
            </header>
        </>
    );
}

export default Header;
