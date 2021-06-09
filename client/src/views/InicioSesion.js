import Header from '../components/Header/Header';
import { useForm } from '../helpers/useForm';
import Swal from 'sweetalert2';
import style from './inicioSesion.module.css';
import { useHistory } from 'react-router-dom';
import { validarDatosLogin } from '../Redux/actions/loginActions';
import { colorPrincipal } from '../helpers/coloresBG';



const InicioSesion = () => {
    colorPrincipal();
    let history = useHistory();

    const [ values, handleInputChange ] = useForm({ email: '', password: '' }) ;
    const { email, password } = values;
  

    const handleSubmit = async( e ) => {
        e.preventDefault();       
      
        const respuestaValidarUser = await validarDatosLogin(values);
          
        if( respuestaValidarUser === 'undefined' ) Swal.fire('Datos inválidos', 'Asegurate de que la contraseña y el correo sean correctos', 'error');
        if( respuestaValidarUser !== 'undefined') history.push("/menuPrincipal");    
    }

    return (
        <>
            <Header />
            <form className={style.form} onSubmit={ handleSubmit }>
                <h3 className={style.auth__title}>Login</h3>
 
                {/* <div className={style.auth__alert_error}>
                    <p>La contraseña es incorrecta</p>
                </div> */}
                           
                <input type="email" className={style.auth__input} 
                autoComplete="off" placeholder="Correo electrónico" 
                name="email" value={email} 
                onChange={ handleInputChange } required />

                <input type="password" className={style.auth__input} 
                placeholder="Contraseña *" name="password" 
                value={password} onChange={ handleInputChange } required />

                <button type="submit" className={style.buttonWidth}>
                    Login
                </button>

            </form>
        </>
    )
}

export default InicioSesion;
