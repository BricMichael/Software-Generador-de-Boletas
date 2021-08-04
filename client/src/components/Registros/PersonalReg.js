import { useEffect, useState } from 'react';
import style from '../../views/Sistema/Usuarios/registrosUsers.module.css';
import { useSelector } from 'react-redux';
import { useForm } from '../../helpers/useForm';
import InfoRegistros from '../InfoDataRegistros/InfoRegistros';
import { stateRegistroUsuario } from '../../helpers/estadosRegistros';
import { registroPersonalAction } from '../../Redux/actions/usuariosActions';




const PersonalReg = () => {
    const [estadoReg, setEstadoReg] = useState({ status: false, msg: '', type: '' })

    const { materiasEspecialista, materiasDocente } = useSelector( state => state.indicador.materias );
    const allMaterias = [ ...materiasDocente, ...materiasEspecialista ];

    const [ values, handleInputChange, reset ] = useForm(stateRegistroUsuario);
    const { nombre, area, cedula, email, password, rol } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        registroPersonalAction( values, reset, setEstadoReg );
    }

    useEffect(() => {
        return () => {
            setEstadoReg({ status: false, msg: '', type: '' });
            reset();
        }
    }, [])
 
    return (
        <div className={ style.infoAndComponent }>
            <InfoRegistros />
            {
               estadoReg.status
                &&  <div className={ estadoReg.type === 'exito'
                        ? style.EstadoRegistroEstudiante 
                        : style.estadoError}
                    >
                        <p className={`${style.respEstado} ${style.respError}`}>
                            { estadoReg.msg  }
                        </p>
                    </div>

           }
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
                    placeholder="Correo electrónico" name="email" onChange={handleInputChange} 
                />

                <input type="password" className={ style.registerInputs } required autoComplete='off'value={password}
                    placeholder="Contraseña *" name="password" onChange={handleInputChange} 
                />
                
                <select className={ style.optionsRegister } onChange={handleInputChange} name='area' value={area}>
                    <option value="default">&Aacute;rea</option>
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
                    <option value="Especialista">Especialista</option>
                    <option value="Docente">Docente</option>  
                    <option value="Coordinador">Coordinador</option>
                    <option value="Admin">Administador</option>    
                </select>      

                <button type="submit" className={style.registerbuton}>
                    Registrar usuario
                </button>
            </form>   
        </div>
    )
}

export default PersonalReg;
