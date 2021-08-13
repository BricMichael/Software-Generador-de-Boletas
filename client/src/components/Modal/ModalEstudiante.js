import Modal from "./Modal";
import style from '../../views/Sistema/Usuarios/registrosUsers.module.css';
import { gradoStudent, seccionStudent } from "../../helpers/arraysOptionsForm";
import { useForm } from "../../helpers/useForm";
import { updateStudentModal } from "../../Redux/actions/usuariosActions";
import { useEffect } from "react";


const ModalEstudiante = ({ alumno, closeModal }) => {
    
    const [ values, handleInputChange, reset ] = useForm( alumno.dataEstudiante );
    const { nombres, cedula_escolar, genero, grado, seccion } = values;

    const cancelUpdate = ( valor ) => closeModal({ ...alumno, state: valor });

    useEffect(() => {
        return () => {
            reset();
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id, ...rest } = values;
        updateStudentModal( id, rest, closeModal );
    }


    return (
        <Modal closeModal={ cancelUpdate } >
             <form className={style.estudianteRegForm} onSubmit={ handleSubmit }>
                <h3 className={style.titleRegisters}>Actualizando Registro</h3>

                <input type="text" className={style.registerInputs} 
                autoComplete="off" placeholder="Nombre Completo" 
                name="nombres" value={ nombres } onChange={ handleInputChange }
                />

                <input type="text" className={style.registerInputs} 
                placeholder="Cédula escolar" name="cedula_escolar"  value={ cedula_escolar } autoComplete="off"
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

                <button type='submit'
                    className={style.formModalEstudianteButtons}>
                    Actualizar
                </button>

                <button className={`${style.formModalEstudianteButtons} ${style.buttonCancel}`}
                    onClick={ () => cancelUpdate(false) } type='button' >   
                    Cancelar
                </button>
            </form>
        </Modal>   
    );
}

export default ModalEstudiante;
