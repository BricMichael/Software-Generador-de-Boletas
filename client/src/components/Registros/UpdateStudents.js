import {  useEffect, useState } from 'react';
import style from './UpdateStudents.module.css';
import { getStudentByCedula } from '../../api/api';
import ModalEstudiante from '../Modal/ModalEstudiante';
import Swal from 'sweetalert2';


const UpdateStudents = () => {
    const [ input, setInput ] = useState({ cedula: '' })
    const [ modalData, setModalData ] = useState({ state: false, dataEstudiante: {} });

    const handleInputChange = ({ target }) => {
        setInput({ 
            [ target.name ]: target.value
         })
    }

    useEffect(() => {
        return () => {
            setModalData({ state: false, dataEstudiante: {} });
            setInput({ cedula: '' });
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        if( input.cedula.length > 3 ) {  
            const { data } =  await getStudentByCedula({ cedula: input.cedula });
            data.error 
            ?   Swal.fire({ 
                    icon: 'warning', 
                    title: 'Datos incorrectos', 
                    confirmButtonColor:'#538fca',
                    text: data.error,
                    width: '440px'
                })
            :  setModalData({ state: false, dataEstudiante: data });
        }
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
                        autoComplete='off'
                    />
                    <button className={ style.SearchFormButton}>Buscar</button>
                </form>

               {    Object.keys( modalData.dataEstudiante ).length > 4  &&
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
