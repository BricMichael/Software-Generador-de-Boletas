import Header from '../components/Header';
import style from './inicioSesion.module.css';

const InicioSesion = () => {
    return (
        <>
            <Header />
            <form className={style.form}>
                <h3 className={style.auth__title}>Login</h3>
 
                {/* <div className={style.auth__alert_error}>
                    <p>La contraseña es incorrecta</p>
                </div> */}
                           
                <input type="text" className={style.auth__input} autoComplete="off" placeholder="Nombre Usuario" name="nombre" required />
                <input type="password"  className={style.auth__input} placeholder="Contraseña *" name="password" required />
                <button type="submit" className={style.buttonWidth}>
                    Login
                </button>

            </form>
        </>
    )
}

export default InicioSesion;
