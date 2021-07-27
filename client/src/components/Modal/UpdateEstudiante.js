import Modal from './Modal'
import PersonalReg from '../Registros/PersonalReg';


const UpdateEstudiante = ({closeModal}) => {

    return (
        <Modal closeModal={ closeModal }>
            <PersonalReg title='Actualizando Datos' closeModal={ closeModal } />        
        </Modal>
    )
}

export default UpdateEstudiante;

