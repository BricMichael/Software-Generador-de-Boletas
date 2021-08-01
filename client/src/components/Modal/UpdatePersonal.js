import { useForm } from '../../helpers/useForm';
import style from '../../views/Sistema/Usuarios/registrosUsers.module.css';
import Modal from './Modal'
import { useSelector, useDispatch } from 'react-redux';



const UpdatePersonal = ({closeModal}) => {
    const { materiasEspecialista, materiasDocente } = useSelector( state => state.indicador.materias );
    const [ values, handleInputChange, reset ] = useForm({ nombre: '', cedula: '', email: '', area: '', rol: '' })

    const { nombre, cedula, email, area, rol } = values;
    const allMaterias = [ ...materiasDocente, ...materiasEspecialista ];

    const handleSubmit = () => {}

    return (
        <Modal closeModal={ closeModal }>
            <form className={style.estudianteRegForm} onSubmit={ handleSubmit }>
                <h3 className={style.titleRegisters}>Actualizando Usuario</h3>
                        
                <input type="text" className={style.registerInputs} 
                autoComplete="off" placeholder="Nombre Completo" name="nombre"
                onChange={ handleInputChange } value={nombre}
                />

                <input type="text" className={ style.registerInputs } 
                placeholder="Cédula" name="cedula"  autoComplete='off' onChange={handleInputChange}
                value={cedula}
                />

                <input type="email" className={ style.registerInputs } required autoComplete='off' value={email}
                placeholder="Correo eléctronico" name="email" onChange={handleInputChange} />

                <select className={ style.optionsRegister } onChange={handleInputChange} name='area' value={area}>
                    <option value="default" >&Aacute;rea</option>
                    {
                        allMaterias.map( value => (
                            <option key={ value.materia } value={ value.materia }>  
                                { value.materia }
                            </option>
                        ))
                    }  
                </select>

                <select className={ style.optionsRegister } onChange={handleInputChange} name='rol' value={rol}>
                    <option value="default">Rol</option>
                    <option value="especialista">Especialista</option>
                    <option value="docente">Docente</option>  
                    <option value="coordinador">Coordinador</option>
                    <option value="admin">Administador</option>    
                </select>      

                <button type="submit" className={style.registerbuton}>
                    Actualizar datos
                </button>
                <button className={`${style.buttonCancelModal}`} 
                onClick={() => closeModal(false)}>
                    Cancelar
                </button>
            
            </form>        
        </Modal>
    )
}

export default UpdatePersonal;

