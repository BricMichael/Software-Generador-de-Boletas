import estilo from './cargosForm.module.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const CargosForm = () => {
    return (
        <>
           <Header />
           <div className={ estilo.container__blue }>

                <h1 className={ estilo.blue_title }>Selecci&oacute;n de Cargo</h1>

                <div className={ estilo.content_links }>

                <Link to="/Cargos/DocenteFormulario" className={ estilo.buttonFormu }>Docente</Link>
                <a href="./registros/regEspecialista.html" className={ estilo.buttonFormu }>Especialista</a>
                <Link to="/Cargos/CoordinadorFormulario" className={ estilo.buttonFormu }>Coordinador(a)</Link>
                <Link to="/Cargos/DepEvaluacionFormulario" className={ estilo.buttonFormu }>Dep. de Evaluaci&oacute;n</Link>

                </div>

                <div className={ estilo.boton_Volver }>
                    <Link to="/" className={ estilo.regresarHome }>Regresar</Link>
                </div>
            </div>          
        </>
    );
}

export default CargosForm;
