import Header from '../components/Header';
import style from './inicioSesion.module.css';

const InicioSesion = () => {
    return (
        <>
            <Header />
            <form className={ style.formSesion }>
                <h1 className={ style.formSesion_h1 }>Iniciar Sesi&oacute;n</h1>
                <div className={ style.inputs }>
                    <input type='text' placeholder='Usuario' className={ style.sesionInputs } name='user' id='user' required />
                    <input type='password' placeholder='Clave' className={ style.sesionInputs } name='clave' id='clave' required />
                </div>
                <button className={ style.LoginButton } type='submit' id='submit'>Iniciar Sesi&oacute;n</button>
            </form>
        </>
    )
}

export default InicioSesion;
