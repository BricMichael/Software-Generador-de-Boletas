import stylo from './footerForms.module.css';
import { Link } from 'react-router-dom';

const FooterForms = () => {
    return (
        <div className={ stylo.buttonsFinales }>
            <Link to="/cargosFormularios" className={ stylo.docente_buttons }>Volver</Link>
            <button className={stylo.docente_buttons} type="submit">Registarse</button>           
        </div>
    )
}

export default FooterForms;