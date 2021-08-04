import style from '../../views/Sistema/Usuarios/registrosUsers.module.css';
import { useEffect, useState } from 'react';
import { useForm } from '../../helpers/useForm';
import InfoRegistros from '../InfoDataRegistros/InfoRegistros';
import { stateRegistroEstudiante } from '../../helpers/estadosRegistros';
import { registroEstudianteAction } from '../../Redux/actions/usuariosActions';
import { gradoStudent, seccionStudent } from '../../helpers/arraysOptionsForm';



const EstudianteReg = () => {

    const [ values, handleInputChange, reset ] = useForm(stateRegistroEstudiante);
    const { nombres, cedulaE, genero, grado, seccion } = values;
    const [estadoReg, setEstadoReg] = useState({ status: false, msg: '', type: '' })
    
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        registroEstudianteAction( values, reset, setEstadoReg );
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
                            { estadoReg.msg }
                        </p>
                    </div>

           }
            <form className={style.estudianteRegForm} onSubmit={ handleSubmit }>
                <h3 className={style.titleRegisters}>Registro de Estudiante</h3>
                        
                <input type="text" className={style.registerInputs} 
                autoComplete="off" placeholder="Nombre Completo" 
                name="nombres" value={ nombres } onChange={ handleInputChange }
                />

                <input type="text" className={style.registerInputs} 
                placeholder="Cédula escolar" name="cedulaE"  value={ cedulaE } autoComplete="off"
                onChange={ handleInputChange }  />

                <select className={ style.optionsRegister } name='genero' value={genero}
                onChange={handleInputChange} >
                    <option>G&eacute;nero</option>
                    <option value="F">F</option>
                    <option value="M">M</option>     
                </select>

                <select className={ style.optionsRegister } name='grado' value={grado}
                onChange={handleInputChange} >
                    {
                        gradoStudent.map( option => (
                        <option value={ option.value } key={ option.value }>{ option.desc }</option>
                        ))
                    }            
                </select>

                <select className={ style.optionsRegister } name='seccion' value={seccion}
                onChange={ handleInputChange } >
                {
                    seccionStudent.map( option => (
                        <option value={ option.value } key={ option.value }>{option.desc}</option> 
                    ))
                }
                </select>

                <button type="submit" className={style.registerbuton}>
                    Registrar Estudiante
                </button>
            </form>   
        </div>  
    );
}

export default EstudianteReg;
