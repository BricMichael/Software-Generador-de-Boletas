import Modal from "./Modal";
import style from './modalDeleteStudentes.module.css'

const ModalDeleteStudents = ({closeModal}) => {
    return (
        <Modal closeModal={closeModal}>
            <div className={ style.contentModalStudents }>
                <h4 className={ style.ModalStudentsTitle}>Datos Estudiantes</h4>
                <p className={ style.ModalStudentsTotal }>Total de Estudiantes: <b>450</b></p>
                <div className={ style.ModalStudentsInfo }>
                    <span className={ style.ModalStudentsSpan }>Primer grado en total: <b>90</b></span>
                    <button className={ style.ModalStudentsInfoButtons } type='button'>Eliminar todos</button>
                </div>
                <div className={ style.ModalStudentsInfo }>
                    <span className={ style.ModalStudentsSpan }>Segundo grado en total: <b>90</b></span>
                    <button className={ style.ModalStudentsInfoButtons } type='button'>Eliminar todos</button>
                </div>
                <div className={ style.ModalStudentsInfo }>
                    <span className={ style.ModalStudentsSpan }>Tercer grado en total: <b>90</b></span>
                    <button className={ style.ModalStudentsInfoButtons } type='button'>Eliminar todos</button>
                </div>
                <div className={ style.ModalStudentsInfo }>
                    <span className={ style.ModalStudentsSpan }>Cuarto grado en total: <b>90</b></span>
                    <button className={ style.ModalStudentsInfoButtons } type='button'>Eliminar todos</button>
                </div>
                <div className={ style.ModalStudentsInfo }>
                    <span className={ style.ModalStudentsSpan }>Quinto grado en total: <b>90</b></span>
                    <button className={ style.ModalStudentsInfoButtons } type='button'>Eliminar todos</button>
                </div>
                <div className={ style.ModalStudentsInfo }>
                    <span className={ style.ModalStudentsSpan }>Sexto grado en total: <b>90</b></span>
                    <button className={ style.ModalStudentsInfoButtons } type='button'>Eliminar todos</button>
                </div>
                
                
                <button type='button' className={ style.ModalStudentsButtonTotal }>Eliminar todos (450) registros</button>
                <button type='button' 
                className={ style.ModalStudentsButtonCancelar }
                onClick={ () => closeModal(false) }
                >
                    Cancelar
                    </button>
            </div>
        </Modal>
    )
}

export default ModalDeleteStudents;
