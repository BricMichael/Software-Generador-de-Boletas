import style from '../../views/Sistema/Usuarios/registrosUsers.module.css'
import { useEffect, useRef } from 'react'
import { useForm } from '../../helpers/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { gradoStudent, seccionStudent } from '../../helpers/arraysOptionsForm'


const EstudianteReg = () => {
    const initialState = useSelector( state => state.registros.formStudent )
    const [ values, handleInputChange, reset ] = useForm( initialState );
    const { nombres, cedulaE, genero, grado, seccion } = values;
    
    const idActive = useRef( initialState.id )

    useEffect(() => {
      if ( initialState.id !== idActive.current ){
          reset( initialState );
          idActive.current = initialState.id;
      }

    }, [initialState])


    const handleSubmit = (e) => {  e.preventDefault(); console.log( values ) }

    return (
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
    );
}

export default EstudianteReg;
