import style from './modal.module.css'

const Modal = () => {
    return (        
        <div className={ style.docenteParrafos }>
            <button type="button" className={ style.edit } data-bs-toggle="modal" data-bs-target="#exampleModal">
                Editar
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editando indicador</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body"> 
                            <textarea className={style.editIndicador} placeholder="Escribe tu indicador"></textarea>
                            
                            <select className={`${style.selects}`}>
                                <option value="default">&Aacute;rea</option>
                                <option value="Leng&Liter">Lengua y Literatura</option>
                                <option value="Matematica">Matematica</option>
                            </select>

                            <select className={`${style.selects}`}>
                                <option value="default">Condición Especial</option>
                                <option value="Leng&Liter">Si</option>
                                <option value="Matematica">No</option>
                            </select>

                            <select className={`${style.selects}`}>
                                <option value="default">Literal</option>
                                <option value="Leng&Liter">E</option>
                                <option value="Matematica">MB</option>
                                <option value="Leng&Liter">B</option>
                                <option value="Matematica">RN</option>
                            </select>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary">Guardar Cambios</button>
                        </div>              
                    </div>   
                </div>
            </div>
        </div>                 
    );
}

export default Modal;
