import Modal from "./Modal";
import style from '../Registros/materias.module.css'
import { useState, useEffect } from 'react'
import { apiRegistrarMaterias } from "../../api/api";
import { validarCampos } from "../../helpers/validarRegistros";
import { useDispatch } from 'react-redux'
import { materiasExistentes } from "../../Redux/actions/boletaActions";
import Swal from "sweetalert2";

const ModalMaterias = ({ closeModal }) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({ tipo:'', materia: '' })
    
    const handleInputChange = ({target}) => {
        setInputs({
            ...inputs,
            [target.name] : target.value
        })
    }

    useEffect(() => {
        return () => {
            setInputs({ tipo:'', materia: '' });
        }
    }, [])

    const subtmitData = async(e) => {
        e.preventDefault();
        const respError = validarCampos( inputs );

        if( respError === 'excelente' && inputs.materia.length > 5){
             await apiRegistrarMaterias( inputs );
             dispatch( materiasExistentes() );
             Swal.fire({ title: 'Materia creada exitosamente', icon: 'success', showConfirmButton: false, timer: '1600' })
             closeModal(false)       
        } 
       
    }

    return (
        <Modal closeModal={ closeModal }>  
            <form className={ style.formMaterias } onSubmit={ subtmitData } >
                <h5>Creando materia</h5>
                <label className={ style.formMateriasLabel }>Materia</label>
                <input type='text' 
                    name='materia' 
                    value={ inputs.materia }
                    placeholder='Nombre de la materia' 
                    className={ style.formMateriasSets } 
                    onChange={ handleInputChange }
                    autoComplete='off'
                />

                <label className={ style.formMateriasLabel }>Tipo</label>
                <select name='tipo' className={ style.formMateriasSelect } onChange={ handleInputChange } value={inputs.tipo} >
                    <option value='default'>Seleccione</option>
                    <option value='Docente'>Docente</option>
                    <option value='Especialista'>Especialista</option>
                </select>
                <button  className={`${style.formMateriasButtons} ${style.materiasBtnSaved}`} 
                    type='submit'
                >
                    Guardar
                </button>
                <button  className={`${style.formMateriasButtons} ${style.materiasBtnCancelar}`} 
                    type='button' onClick={ () =>  closeModal(false) }
                >
                    Cancelar
                </button>
            </form>
        </Modal>
    )
}

export default ModalMaterias;
