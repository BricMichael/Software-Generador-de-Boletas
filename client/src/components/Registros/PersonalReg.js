import style from '../../views/Sistema/Usuarios/registrosUsers.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../helpers/useForm';




const PersonalReg = () => {
    const { materiasEspecialista, materiasDocente } = useSelector( state => state.indicador.materias );
    const [ values, handleInputChange, reset ] = useForm({nombre: '', area: '', cedula: '', email: '', password: '', rol: '' });

    const { nombre, area, cedula, email, password, rol } = values;
    const allMaterias = [ ...materiasDocente, ...materiasEspecialista ];

    const handleSubmit = () => {}
 
    return (
        <form className={style.estudianteRegForm} onSubmit={ handleSubmit }>
            <h3 className={style.titleRegisters}>Registro de Usuario</h3>
                    
            <input type="text" className={style.registerInputs} 
                autoComplete="off" placeholder="Nombre Completo" name="nombre"
                onChange={ handleInputChange } value={nombre}
            />

            <input type="text" className={ style.registerInputs } 
                placeholder="Cédula" name="cedula"  autoComplete='off' onChange={handleInputChange}
                value={cedula}
            />

            <input type="email" className={ style.registerInputs } required autoComplete='off' value={email}
                placeholder="Correo eléctronico" name="email" onChange={handleInputChange} 
            />

            <input type="password" className={ style.registerInputs } required autoComplete='off'value={password}
                placeholder="Contraseña *" name="password" onChange={handleInputChange} 
            />
            
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
                Registrar usuario
            </button>
         </form>   
    )
}

export default PersonalReg;
