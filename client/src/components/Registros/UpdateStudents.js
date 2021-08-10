import {  useState } from 'react';
import { getStudentByCedula } from '../../api/api';
import ModalEstudiante from '../Modal/ModalEstudiante';
import style from './UpdateStudents.module.css';

const UpdateStudents = () => {
    const [ input, setInput ] = useState({ cedula: '' })
    const [ modalData, setModalData ] = useState({ state: false, dataEstudiante: {} });

    const handleInputChange = ({ target }) => {
        setInput({ 
            [ target.name ]: target.value
         })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { data } =  await getStudentByCedula({ cedula: input.cedula });
        setModalData({ state: false, dataEstudiante: data })
        console.log( data)
    }
    return (
        <>
            { modalData.state && <ModalEstudiante  closeModal={ setModalData }  alumno={ modalData } /> }
            <div className={ style.contentUpdateStudent }>      
                <form className={ style.contentSearchForm } onSubmit={ handleSubmit }>
                    <h2>Buscar estudiante</h2>
                    <input 
                        type='text'
                        placeholder='Cédula escolar del estudiante'
                        className={ style.SearchFormInput}
                        name='cedula'
                        value={ input.cedula }
                        onChange={ handleInputChange }
                    />
                    <button className={ style.SearchFormButton}>Buscar</button>
                </form>

               {    Object.entries( modalData.dataEstudiante ).length > 4  &&
                    <div className={ style.contentResponse }>
                        <h2>Estudiante</h2>
                        <div className={ style.flexdata}>
                            <b>Nombre:</b> 
                            <p>{ modalData.dataEstudiante.nombres }</p>
                        </div>
                        <div  className={ style.flexdata}>
                            <b>Grado:</b> 
                            <p>{ modalData.dataEstudiante.grado }</p>
                        </div>
                        <div  className={ style.flexdata}>
                            <b>Sección:</b> 
                            <p>{ modalData.dataEstudiante.seccion }</p>
                        </div>
                        <button 
                        onClick={ () => setModalData({...modalData, state: true }) }
                        className={ style.ResponseButton }>
                            Modificar datos
                        </button>
                    </div>
               }
            </div>
        </>
    )
}

export default UpdateStudents;
