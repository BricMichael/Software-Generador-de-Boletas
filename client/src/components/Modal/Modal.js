import style from './modal.module.css';

const Modal = ({ children, closeModal }) => {

    const preventParentEvent = (e) => e.stopPropagation();

    return (
        <div className={ `${style.modalContainer} animate__animated animate__fadeIn animate__delay-02s`} 
            onClick={ () => closeModal(false) }>

            <div className={ `${style.modalBody} `} onClick={ preventParentEvent }>
                { children }
            </div>
        </div>
    )
}

export default Modal;
