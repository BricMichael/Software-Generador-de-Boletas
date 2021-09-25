import style from './btnHome.module.css';
import { Link } from 'react-router-dom'



const BotonHome = ({ resetState }) => {
    return (
        <div className={ style.contentBtnHome }>
            <Link to="/menu-principal" className={ style.btnHome } onClick={resetState}>
                <i className="fas fa-chevron-left"></i> Inicio
            </Link>       
        </div>
    )
}

export default BotonHome;
