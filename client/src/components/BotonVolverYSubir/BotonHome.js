import style from './btnHome.module.css';
import { Link } from 'react-router-dom'



const BotonHome = () => {
    return (
        <div className={ style.contentBtnHome }>
            <Link to="/menu-principal" className={ style.btnHome } >
                <i className="fas fa-chevron-left"></i> Inicio
            </Link>
            
        </div>
    )
}

export default BotonHome;
