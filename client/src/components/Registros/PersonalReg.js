import { useEffect, useState } from 'react';
import style from '../../views/Sistema/Usuarios/registrosUsers.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../helpers/useForm';
import { stateRegistroUsuario } from '../../helpers/estadosRegistros';
import { limpiarMsgEstado, registroPersonalAction } from '../../Redux/actions/usuariosActions';
import { apiRegisterPersonal, apiTotalUsersByRol } from '../../api/api';
import { existeRolCoordinadorAction, existeRolDirectorAction } from '../../Redux/actions/configuracionActions';


const PersonalReg = () => {
    const dispatch = useDispatch();
    const [estadoReg, setEstadoReg] = useState({ status: false, msg: '', type: '' })

    const { existeRolCoordinador, existeRolDirector } = useSelector(state => state.config);
    const { materiasEspecialista } = useSelector(state => state.indicador.materias);

    const [values, handleInputChange, reset] = useForm(stateRegistroUsuario);
    const { nombre, especialidad, cedula, email, password, rol } = values;

    useEffect(() => {
        const askRoles = async () => {
            const { data } = await apiTotalUsersByRol();

            for (const item of data) {
                if (item.rol === 'coordinador' && +item.total === 1) dispatch(existeRolCoordinadorAction())
                if (item.rol === 'director' && +item.total === 1) dispatch(existeRolDirectorAction())
            }
        }

        askRoles()

        return () => {
            setEstadoReg({ status: false, msg: '', type: '' });
            reset();
        }
    }, [])

    let comprobacion = rol !== 'director';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nombre === '' || cedula === '') {
            setEstadoReg({ status: true, msg: 'Asegurate de haber llenado los campos', type: 'error' });
            limpiarMsgEstado(setEstadoReg);
        } else if (!comprobacion) { // registrando User director(a).
            const { data: { msg } } = await apiRegisterPersonal({ nombre, cedula, rol, password: '', email: '', especialidad: null });
            reset();
            setEstadoReg({ status: true, msg, type: 'exito' });
            limpiarMsgEstado(setEstadoReg);
            dispatch(existeRolDirectorAction());
        }
        else {
            dispatch(registroPersonalAction(values, reset, setEstadoReg));
        }
    }

    return (
        <div className={style.infoAndComponent}>
            {
                estadoReg.status
                && <div className={estadoReg.type === 'exito'
                    ? style.EstadoRegistroEstudiante
                    : style.estadoError}
                >
                    <p className={`${style.respEstado} ${style.respError}`}>
                        {estadoReg.msg}
                    </p>
                </div>

            }
            <form className={style.estudianteRegForm} onSubmit={handleSubmit}>
                <h3 className={style.titleRegisters}>Registro de Usuario</h3>

                <input type="text" className={style.registerInputs}
                    autoComplete="off" placeholder="Nombre Completo" name="nombre"
                    onChange={handleInputChange} value={nombre}
                />

                <input type="text" className={style.registerInputs}
                    placeholder="Cédula" name="cedula" autoComplete='off' onChange={handleInputChange}
                    value={cedula}
                />

                <select className={style.optionsRegister} onChange={handleInputChange} name='rol' value={rol}>
                    <option value="default">Rol</option>
                    <option value="especialista">Especialista</option>
                    <option value="docente">Docente</option>
                    <option value="admin">Administador</option>
                    {!existeRolCoordinador && <option value="coordinador">Coordinador</option>}
                    {!existeRolDirector && <option value="director">Director/a</option>}
                </select>

                {
                    comprobacion &&
                    <>
                        <input type="email" className={style.registerInputs} required autoComplete='off' value={email}
                            placeholder="Correo electrónico (único)*" name="email" onChange={handleInputChange}
                        />

                        <input type="password" className={style.registerInputs} required autoComplete='off' value={password}
                            placeholder="Contraseña *" name="password" onChange={handleInputChange}
                        />

                        {
                            rol === 'especialista' &&
                            <select className={style.optionsRegister} onChange={handleInputChange} name='especialidad' value={especialidad}>
                                <option value="default">Especialidad</option>
                                {
                                    materiasEspecialista.map(value => (
                                        <option key={value.materia} value={value.materia}>
                                            {value.materia}
                                        </option>
                                    ))
                                }
                            </select>
                        }
                    </>
                }

                <button type="submit" className={style.registerbuton}>
                    Registrar usuario
                </button>
            </form>
        </div>
    )
}

export default PersonalReg;
