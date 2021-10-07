import { useEffect, useState } from 'react';
import style from '../../views/Sistema/Usuarios/registrosUsers.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../helpers/useForm';
import { stateRegistroUsuario } from '../../helpers/estadosRegistros';
import { limpiarMsgEstado, registroPersonalAction } from '../../Redux/actions/usuariosActions';
import { apiRegisterPersonal, apiTotalUsersByRol } from '../../api/api';
import { existeRolCoordinadorAction, existeRolDirectorAction } from '../../Redux/actions/configuracionActions';
import { roles } from '../../helpers/roles';




const PersonalReg = () => {
    const dispatch = useDispatch();
    const [estadoReg, setEstadoReg] = useState({ status: false, msg: '', type: '' })

    const { existeRolCoordinador, existeRolDirector } = useSelector(state => state.config);
    const { materiasEspecialista, materiasDocente } = useSelector(state => state.indicador.materias);
    const allMaterias = [...materiasDocente, ...materiasEspecialista];

    const [values, handleInputChange, reset] = useForm(stateRegistroUsuario);
    const { nombre, area, cedula, email, password, rol } = values;

    useEffect(() => {
        const askRoles = async () => {
            const { data } = await apiTotalUsersByRol();

            for (const item of data) {
                if (item.rol === 'Coordinador' && +item.total === 1) dispatch(existeRolCoordinadorAction())

                else if (item.rol === 'Director' && +item.total === 1) dispatch(existeRolDirectorAction())
            }
        }

        askRoles()

        return () => {
            setEstadoReg({ status: false, msg: '', type: '' });
            reset();
        }
    }, [])

    let comprobacion = rol !== 'Director';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nombre === '' || cedula === '') {
            setEstadoReg({ status: true, msg: 'Asegurate de haber llenado los campos', type: 'error' });
            limpiarMsgEstado(setEstadoReg);
        } else if (!comprobacion) {
            const { data: { msg } } = await apiRegisterPersonal({ nombre, cedula, rol, password: '', email: '', area: '' });
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
                    <option value="Especialista">Especialista</option>
                    <option value="Docente">Docente</option>
                    <option value="Admin">Administador</option>
                    {!existeRolCoordinador && <option value="Coordinador">Coordinador</option>}
                    {!existeRolDirector && <option value="Director">Director/a</option>}
                </select>

                {
                    comprobacion &&
                    <>
                        <input type="email" className={style.registerInputs} required autoComplete='off' value={email}
                            placeholder="Correo electrónico" name="email" onChange={handleInputChange}
                        />

                        <input type="password" className={style.registerInputs} required autoComplete='off' value={password}
                            placeholder="Contraseña *" name="password" onChange={handleInputChange}
                        />

                        {
                            rol !== roles.coordinador &&
                            <select className={style.optionsRegister} onChange={handleInputChange} name='area' value={area}>
                                <option value="default">&Aacute;rea</option>
                                {
                                    allMaterias.map(value => (
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
