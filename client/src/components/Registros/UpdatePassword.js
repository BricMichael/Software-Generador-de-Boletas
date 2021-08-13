import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { apiGetUserByCedula, updatePasswordPersonal } from '../../api/api';
import style from './UpdateStudents.module.css';


const UpdatePassword = () => {

    const [ input, setInput ] = useState({ cedula: '', clave: '' })
    const [ showData, setShowData ] = useState({ state: false, dataUsuario: {} });

    const handleInputChange = ({ target }) => {
        setInput({ 
            ...input,
            [ target.name ]: target.value
         })
    }

    useEffect(() => {
        return () => {
            setShowData({ state: false, dataUsuario: {} });
            setInput({ cedula: '', clave: '' });
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { data } = await apiGetUserByCedula( input.cedula );
        data.error ? Swal.fire({ 
            icon: 'warning', 
            title: 'Datos incorrectos', 
            confirmButtonColor:'#538fca',
            text: data.error,
            width: '440px'
        })
        : setShowData({ state: true, dataUsuario: data })
    }

    const buttonChangePassword = async() => {
       if ( input.clave.length < 7 ) {
           Swal.fire({ icon: 'warning', title: 'Contraseña muy débil', text: 'Debe ser mayor a 6 carácteres', width: '400px'})
       } else {
            await updatePasswordPersonal( showData.dataUsuario.id, { password: input.clave } );
            Swal.fire({ position: 'top-end', icon: 'success', title: 'Contraseña actualizada',
                showConfirmButton: false, timer: 1300
            })
            setInput({ cedula: '', clave: '' });
            setTimeout(() => {
                setShowData({ state: false, dataUsuario: {}  })
            }, 2600);
       }
    }

    return (
        <>
              <div className={ style.contentUpdateStudent }>      
                <form className={ style.contentSearchForm } onSubmit={ handleSubmit }>
                    <h2>Buscar Usuario</h2>
                    <input 
                        type='text'
                        placeholder='Cédula del usuario'
                        className={ style.SearchFormInput}
                        name='cedula'
                        value={ input.cedula }
                        onChange={ handleInputChange }
                        autoComplete='off'
                    />
                    <button className={ style.SearchFormButton}>Buscar</button>
                </form>

               {     showData.state &&
                    <div className={ style.contentResponse }>
                        <h2>Datos del Usuario</h2>
                        <div className={ style.flexdata}>
                            <b>Nombre:</b> 
                            <p>{ showData.dataUsuario.nombre }</p>
                        </div>
                        <div  className={ style.flexdata}>
                            <b>Área:</b> 
                            <p>{ showData.dataUsuario.area_personal }</p>
                        </div>
                        <div  className={ style.flexdata}>
                            <b>Rol:</b> 
                            <p>{ showData.dataUsuario.rol }</p>
                        </div>
                        <div  className={ style.flexdata}>
                            <b>Nueva contraseña</b> 
                            <input type='password' autoComplete='off' onChange={ handleInputChange }
                                name='clave' value={input.clave} className={ style.inputUpdatePassword }
                                placeholder='Contraseña *'
                            />
                        </div>
                        
                        <button  type='button'
                        onClick={ buttonChangePassword }
                        className={ style.ResponseButton }> 
                            Cambiar contraseña
                        </button>
                    </div>
               }
            </div>
        </>
    )
}

export default UpdatePassword;
