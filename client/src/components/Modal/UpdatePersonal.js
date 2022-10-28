import { useEffect } from 'react';
import { useForm } from '../../helpers/useForm';
import style from '../../views/Sistema/Usuarios/registrosUsers.module.css';
import Modal from './Modal'
import { updateRegistroAction } from '../../Redux/actions/usuariosActions';
import { cambioDeDatos, removerEspacios } from '../../helpers/validarRegistros';
import { useSelector } from 'react-redux'


const UpdatePersonal = ({ closeModal, datos, dataState, updateState }) => {
    const { existeRolCoordinador, existeRolDirector } = useSelector(state => state.config);
    const { materiasEspecialista } = useSelector(state => state.indicador.materias);
    
    const [values, handleInputChange, reset] = useForm(datos);
    const { especialidad, cedula, email, nombre, rol } = values;

    useEffect(() => {
        return () => {
            reset();
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let resp = cambioDeDatos(datos, values);

        if (resp) {
            updateRegistroAction(values.id, values);

            const updateStateNewData = dataState.datos.map(usuario => usuario.id === values.id ? values : usuario);
            let verificarNombre = datos.nombre.split(' ')[0] + ' ' + datos.nombre.split(' ')[2];
            let newName = '';

            if (datos.nombre !== values.nombre) newName = removerEspacios(values.nombre.split(' '));

            if (newName !== '') {
                const nameUpdated = dataState.nombres.map(name => name === verificarNombre ? newName : name);
                updateState({ datos: updateStateNewData, nombres: nameUpdated });

            } else {
                updateState({ ...dataState, datos: updateStateNewData });
            }
        }
        closeModal({ status: false, userSelected: {} });
    }

    const buttonCancelModal = (valor) => {
        closeModal({ status: valor, userSelected: {} });
    }

    return (
        <Modal closeModal={buttonCancelModal}>
            <form className={style.estudianteRegForm} onSubmit={handleSubmit}>
                <h3 className={style.titleRegisters}>Actualizando Usuario</h3>

                <input type="text" className={style.registerInputs}
                    autoComplete="off" placeholder="Nombre Completo" name="nombre"
                    onChange={handleInputChange} value={nombre}
                />

                <input type="text" className={style.registerInputs}
                    placeholder="Cédula" name="cedula" autoComplete='off' onChange={handleInputChange}
                    value={cedula}
                />

                {
                    rol !== 'director' &&
                    <>
                        <input type="email"
                            className={style.registerInputs}
                            required
                            autoComplete='off'
                            value={email}
                            placeholder="Correo eléctronico"
                            name="email"
                            onChange={handleInputChange}
                        />

                        <select className={style.optionsRegister} onChange={handleInputChange} name='rol' value={rol}>
                            <option value="default">*Rol*</option>
                            <option value="especialista">Especialista</option>
                            <option value="docente">Docente</option>
                            <option value="admin">Administador</option>
                            {
                                !existeRolCoordinador &&<option value="coordinador">Coordinador</option>
                            }
                            {
                                !existeRolDirector && <option value="director">Director/a</option>
                            }                            
                        </select>
                    </>
                }

                {
                    rol === 'especialista' &&
                    <select className={style.optionsRegister} onChange={handleInputChange} name='especialidad' value={especialidad}>
                        <option value="default">*Especialidad*</option>
                        {
                            materiasEspecialista.map(value => (
                                <option key={value.materia} value={value.materia}>
                                    {value.materia}
                                </option>
                            ))
                        }
                    </select>
                }

                <button className={style.registerbuton} type='submit'>
                    Actualizar datos
                </button>
                <button className={`${style.buttonCancelModal}`} type='button'
                    onClick={() => buttonCancelModal(false)}>
                    Cancelar
                </button>

            </form>
        </Modal>
    )
}

export default UpdatePersonal;

