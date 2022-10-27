import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { apiGetUsers, updatePasswordPersonal } from '../../api/api';
import style from './UpdateStudents.module.css';


const UpdatePassword = () => {
    const [input, setInput] = useState({ cedula: '', clave: '' })
    const [showData, setShowData] = useState({ state: false, dataUsuario: {}, allUser: [] });
    const roleUserFound = showData.dataUsuario.rol;

    const handleInputChange = ({ target }) => {
        setInput({
            ...input,
            [target.name]: target.value
        })
    }

    useEffect(() => {
        const getUsers = async () => {
            const { data } = await apiGetUsers('UpdatePassword');
            setShowData({ ...showData, allUser: data });
        }
        getUsers();

        return () => {
            setShowData({ state: false, dataUsuario: {}, allUser: [] });
            setInput({ cedula: '', clave: '' });
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userSelected = showData.allUser.find(value => value.cedula === input.cedula.trim().split(' ')[0])

        if (!userSelected) {
            Swal.fire({
                icon: 'warning',
                title: 'Datos incorrectos',
                confirmButtonColor: '#538fca',
                text: 'No se ha podido encontrar al usuario, vuelve a intentarlo.',
                width: '440px'
            })
        } else {
            setShowData({ ...showData, state: true, dataUsuario: userSelected })
        }
    }

    const buttonChangePassword = async () => {
        if (input.clave.length <= 6) {
            Swal.fire({ icon: 'warning', title: 'Contraseña muy débil', text: 'Debe ser mayor a 6 carácteres', width: '400px' })
        } else {
            await updatePasswordPersonal(showData.dataUsuario.id, { password: input.clave });

            Swal.fire({
                position: 'top-end', icon: 'success', title: 'Contraseña actualizada',
                showConfirmButton: false, timer: 1300
            })

            setInput({ cedula: '', clave: '' });
            setTimeout(() => {
                setShowData({ ...showData, state: false, dataUsuario: {} })
            }, 2800);
        }
    }

    return (
        <>
            <div className={style.contentUpdateStudent}>
                <form className={style.contentSearchForm} onSubmit={handleSubmit}>
                    <h2>Buscar Usuario</h2>
                    <input
                        type='text'
                        placeholder='Cédula o nombre del usuario'
                        className={style.SearchFormInput}
                        name='cedula'
                        value={input.cedula}
                        onChange={handleInputChange}
                        autoComplete='off'
                        list='my-list'
                    />

                    <datalist id='my-list'>
                        {
                            showData.allUser.map(item => (
                                <option key={item.id} value={`${item.cedula}  ${item.nombre}`} />
                            ))
                        }
                    </datalist>

                    <button className={style.SearchFormButton}>Buscar</button>
                </form>

                {showData.state &&
                    <div className={style.contentResponse}>
                        <h2>Datos del Usuario</h2>
                        <div className={style.flexdata}>
                            <b>Nombre:</b>
                            <p>{showData.dataUsuario.nombre}</p>
                        </div>
                        { showData.dataUsuario.rol === 'especialista' &&
                            <div className={style.flexdata}>
                                <b>Especialidad:</b>
                                <p>{showData.dataUsuario.especialidad}</p>
                            </div>
                        }
                        <div className={style.flexdata}>
                            <b>Rol:</b>
                            <p>{ roleUserFound.slice(0,1).toUpperCase() + roleUserFound.slice(1)}</p>
                        </div>
                        <div className={style.flexdata}>
                            <b>Nueva contraseña</b>
                            <input type='password' autoComplete='off' onChange={handleInputChange}
                                name='clave' value={input.clave} className={style.inputUpdatePassword}
                                placeholder='Contraseña *'
                            />
                        </div>

                        <button type='button'
                            onClick={buttonChangePassword}
                            className={style.ResponseButton}>
                            Cambiar contraseña
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default UpdatePassword;
