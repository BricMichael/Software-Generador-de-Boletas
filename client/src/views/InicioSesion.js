import { useEffect, useState } from 'react';
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


    const [values, handleInputChange, reset] = useForm({ email: '', password: '', cedulaInvertida: '', nuevaClave: '' });
    const [cambiarClave, setCambiarClave] = useState(false);
    const [cedulaAdmin, setCedulaAdmin] = useState({cedula: ''})
    const { email, password, cedulaInvertida, nuevaClave } = values;

    useEffect(() => {
        const estatusOfLogin = JSON.parse(window.localStorage.getItem('userActive'));
        if (estatusOfLogin) dispatch(usuarioLogeado(true))
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const respuestaValidarUser = await validarDatosLogin(values, cambiarClave);

        if( !respuestaValidarUser?.autorizacion && respuestaValidarUser?.isAdmin ) {
            Swal.fire('Datos inválidos', 'Asegurate de que la contraseña y el correo sean correctos', 'error');
            return setCedulaAdmin({ cedula: respuestaValidarUser.cedula });
        }

        if( respuestaValidarUser?.msg ) { /// se cambió la clave, esperar que ingrese la nueva.
            setCambiarClave(false);
            setCedulaAdmin({cedula: ''});
            return reset({ email, password: '', cedulaInvertida: '', nuevaClave: '' });
        }; 
        if ( !respuestaValidarUser?.autorizacion ) {
            setCambiarClave(false);
            setCedulaAdmin({cedula: ''});
            return Swal.fire('Datos inválidos', 'Asegurate de que la contraseña y el correo sean correctos', 'error');
        }
        if (respuestaValidarUser?.autorizacion) dispatch(usuarioLogeado(true));
    }

    return (
        <>
            <Header />
            <form className={style.form} onSubmit={handleSubmit}>
                <h3 className={style.auth__title}>Inicio de Sesi&oacute;n</h3>

                <input type="email" className={style.auth__input}
                    autoComplete="off"
                    placeholder="Correo electrónico"
                    name="email" value={email}
                    onChange={handleInputChange}
                    required
                />

                <input type="password" className={style.auth__input} placeholder="Contraseña *" name="password" value={password} onChange={handleInputChange} required autoComplete="off"
                />

               {
                    cambiarClave &&
                    <input 
                        type="text" 
                        className={style.auth__input} 
                        placeholder="Ingrese su cédula al revés" name="cedulaInvertida" 
                        value={cedulaInvertida} onChange={handleInputChange} 
                        autoComplete="off"
                    />
               }

                {   cedulaAdmin.cedula && cedulaAdmin.cedula.split('').reverse().join('') === cedulaInvertida && cambiarClave &&
                      <input 
                        type="password" 
                        className={style.auth__input} 
                        placeholder="Nueva contraseña" name="nuevaClave" 
                        value={nuevaClave} onChange={handleInputChange} 
                        autoComplete="off"
                    />
                }

                {   cedulaAdmin.cedula &&
                    <p style={{color: '#032a69', cursor: 'pointer'}} onClick={() => setCambiarClave(!cambiarClave)}>Cambiar contraseña *</p>
                }
                <button type="submit" className={style.buttonWidth}>
                    { cambiarClave ? 'Cambiar Clave' : ' Ingresar' }
                </button>
            </form>
            
        </>
    )
}

export default InicioSesion;
