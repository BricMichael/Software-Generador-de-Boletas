import Modal from "./Modal";
import { useRef, useEffect } from "react";
import style from './UpdateIndicador.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "../../helpers/useForm";
import { actualizarIndicadorBD, limpiarFormAlActualizar } from "../../Redux/actions/indicadoresActions";
import { roles } from "../../helpers/roles";



const UpdateIndicador = ({ closeModal }) => {
    const dispatch = useDispatch();
    const dataIndicador = useSelector( state => state.indicador.updateIndicador.dataIndicador );
    const { materiasDocente, materiasEspecialista} = useSelector( state => state.indicador.materias );

    const rolUser = JSON.parse( localStorage.getItem('userActive')).rol

    const [ values, handleInputChange, reset ] = useForm( dataIndicador );
    const { indicador, literal, area, condicion_especial, grado, momento } = values;

    const idActive = useRef( dataIndicador.id );    

    useEffect(() => {
        if( dataIndicador.id !== idActive.current) {
            reset( dataIndicador );
            idActive.current = dataIndicador.id;
        }
    }, [dataIndicador, reset])

    const updateNewData = (e) => {
        e.preventDefault();
        dispatch( actualizarIndicadorBD( idActive.current, values ) );
        closeModal(false);
    }

    const cancelUpdate = () => {
        closeModal(false);
        dispatch( limpiarFormAlActualizar() );
    }

    const recorrerArray = rolUser === roles.especialista ? materiasEspecialista : materiasDocente;

    return (
        <Modal closeModal={ closeModal }>
            <form className={ style.formModal }>
                <h2 className={ style.titleFormModal }>Actualizando Indicador</h2>
                <textarea 
                    className={`${style.ModaltextArea} ${ rolUser === roles.especialista && style.Height}`}  name="indicador" value={ indicador }
                    onChange={ handleInputChange }
                    placeholder="Editando indicador">
                </textarea>

                <select className={`${style.Modalselect}`} 
                    name='area' 
                    value={ area } 
                    onChange={ handleInputChange }
                >
                    <option value="undefined">Área</option>
                    {
                        recorrerArray.map( area => (
                            <option value={area.materia} key={area.materia}>{ area.materia }</option>
                        ))
                    }                     
                </select>

                <select className={`${style.Modalselect}`} name="condicion_especial"
                    value={ condicion_especial } onChange={ handleInputChange  }
                >
                    <option value="default">Cond. Especial</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>                      
                </select>

                <select className={`${style.Modalselect}`} name="momento" value={momento}
                  onChange={ handleInputChange  }
                >
                    <option value="default">Momento</option>
                    <option value="Momento 1">Momento 1</option>
                    <option value="Momento 2">Momento 2</option>
                    <option value="Momento 3">Momento 3</option>                      
                </select>
                {
                    rolUser === roles.especialista &&
                    <>
                        <select className={`${style.Modalselect}`} name="grado" value={grado}
                            onChange={ handleInputChange  }
                        >
                            <option value="default">Grado</option>
                            <option value="1">1er Grado</option>
                            <option value="2">2do Grado</option>
                            <option value="3">3er Grado</option>
                            <option value="4">4to Grado</option>
                            <option value="5">5to Grado</option>
                            <option value="6">6to Grado</option>
                        </select>  

                        <select className={`${style.Modalselect}`} name="literal" value={literal}
                            onChange={ handleInputChange  }
                        >
                            <option value="default">Literal</option>
                            <option value="E">E</option>
                            <option value="B">MB</option>
                            <option value="RN">RN</option>                            
                        </select> 
                    </>
                }       
                     
                <button type='submit' onClick={ updateNewData }
                    className={style.formModalButtons}>
                    Actualizar
                </button>


                <button className={`${style.formModalButtons} ${style.buttonCancel}`}
                    onClick={ cancelUpdate } type='button'>   
                    Cancelar
                </button>
            </form>
        </Modal>
    )
}

export default UpdateIndicador;
