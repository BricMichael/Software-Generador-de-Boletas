import estilo from './header.module.css';
import clogo from '../../assets/img/colegioLogo.png';

const Header = ({ title = 'Colegio República de Venezuela', color, marginTop }) => {

    return (
        <>
            <header className={ estilo.headerlog } style={{ marginTop }} id="stopButtonEdit">
                <img src={ clogo } className={ estilo.header_imag } alt='logo de la institucion' />
                <p className={estilo.header__title } style={{color}}>{ title }</p>
            </header>
        </>
    );
}

export default Header;

