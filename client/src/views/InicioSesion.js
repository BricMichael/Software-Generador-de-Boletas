import { useEffect } from 'react';
import Header from '../components/Header/Header';
import style from './inicioSesion.module.css';
import { useForm } from '../helpers/useForm';
import Swal from 'sweetalert2';
import { usuarioLogeado, validarDatosLogin } from '../Redux/actions/loginActions';
import { backgroundColorPage } from '../helpers/coloresBG';
import { useDispatch } from 'react-redux'



const InicioSesion = () => {
    backgroundColorPage('#012c66');
    document.title = 'Iniciar Sesión';
    const dispatch = useDispatch();
    

    const [ values, handleInputChange ] = useForm({ email: '', password: '' }) ;
    const { email, password } = values;

    useEffect(() => {
        const estatusOfLogin = JSON.parse(window.localStorage.getItem('userActive'));
        if ( estatusOfLogin ) dispatch( usuarioLogeado(true) )          
    }, [dispatch])
  

    const handleSubmit = async( e ) => {
        e.preventDefault();        
        const respuestaValidarUser = await validarDatosLogin(values);
        if( respuestaValidarUser === 'undefined' ) Swal.fire('Datos inválidos', 'Asegurate de que la contraseña y el correo sean correctos', 'error');
        if( respuestaValidarUser !== 'undefined' ) dispatch( usuarioLogeado(true) );
    }

    return (
        <>
            <Header />
            <form className={style.form} onSubmit={ handleSubmit }>
                <h3 className={style.auth__title}>Ingresar al sistema</h3>
                           
                <input type="email" className={style.auth__input} 
                autoComplete="off" placeholder="Correo electrónico" 
                name="email" value={email} 
                onChange={ handleInputChange } required />

                <input type="password" className={style.auth__input} 
                placeholder="Contraseña *" name="password" 
                value={password} onChange={ handleInputChange } required />

                <button type="submit" className={style.buttonWidth}>
                    Iniciar Sesi&oacute;n
                </button>

            </form>
        </>
    )
}

export default InicioSesion;
