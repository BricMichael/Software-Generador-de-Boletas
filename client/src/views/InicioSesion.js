import { useEffect } from 'react';
import Header from '../components/Header/Header';
import { useForm } from '../helpers/useForm';
import Swal from 'sweetalert2';
import style from './inicioSesion.module.css';
import { usuarioLogeado, validarDatosLogin } from '../Redux/actions/loginActions';
import { colorPrincipal } from '../helpers/coloresBG';
import { useDispatch } from 'react-redux'



const InicioSesion = () => {
    colorPrincipal();
    const dispatch = useDispatch();
    const estatusOfLogin = JSON.parse(window.localStorage.getItem('userActive'));

    const [ values, handleInputChange ] = useForm({ email: '', password: '' }) ;
    const { email, password } = values;

    useEffect(() => {
        if ( estatusOfLogin ) dispatch( usuarioLogeado(true) )          
    }, [dispatch, estatusOfLogin])
  

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
                <h3 className={style.auth__title}>Login</h3>
                           
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
