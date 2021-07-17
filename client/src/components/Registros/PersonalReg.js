import style from '../../views/Sistema/Usuarios/registrosUsers.module.css'
import { useSelector } from 'react-redux'

const PersonalReg = () => {
    const { materiasEspecialista, materiasDocente } = useSelector( state => state.indicador.materias );
    const allMaterias = [ ...materiasDocente, ...materiasEspecialista ];



    return (
        <form className={style.estudianteRegForm} onSubmit="">
            <h3 className={style.titleRegisters}>Registro de usuario</h3>
                    
            <input type="text" className={style.registerInputs} 
            autoComplete="off" placeholder="Nombre Completo" name="name"
             />

            <input type="text" className={ style.registerInputs } 
            placeholder="Cédula" name="cedula"  autoComplete='off' />

            <input type="email" className={ style.registerInputs } required autoComplete='off'
            placeholder="Correo eléctronico" name="email" />

            <input type="password" className={ style.registerInputs } required autoComplete='off'
                placeholder="Contraseña *" name="password" />

            <select className={ style.optionsRegister }>
                <option value="default" >&Aacute;rea</option>
                {
                    allMaterias.map( value => (
                        <option key={ value.materia } value={ value.materia }>  
                            { value.materia }
                        </option>
                    ))
                }  
            </select>

            <select className={ style.optionsRegister } >
                <option>Rol</option>
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
