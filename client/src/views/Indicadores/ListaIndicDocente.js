import Modal from '../../components/Modal/Modal';
import style from './listaDocente.module.css';


const ListaIndicDocente = () => {
    
    return (
        <div className={`${style.tabla_contain}`}>
            <div className={`${style.titulos_tabla}`}>
                <h3 className={`${style.titulosIndividuales} ${style.hastag}`}>#</h3>
                <h3 className={`${style.tituloIndicador} ${style.titulosIndividuales}`}>Indicador</h3>
                <h3 className={`${style.areaTitulo} ${style.titulosIndividuales}`}>Área</h3>
                <h3 className={`${style.titulosIndividuales}`}>Literal</h3>
                <h3 className={`${style.titulosIndividuales} ${style.titleCEsp}`}>Cond. Especial</h3>
            </div>

            <div className={`${style.data_indicadores}`}>
                <h3 className={`${style.parrafosData}`}>1</h3>
                <p className={`${style.rezise_indicador} ${style.parrafosData}`}>Se le llama indicador a cualquier objeto o persona que se encargue de mostrar.Se le llama indicador a cualquier objecto.</p>
                <p className={`${style.parrafosData}`}>Música</p>
                <p className={`${style.parrafosData}`}>MB</p>
                <p className={`${style.parrafosData} ${style.condEspecial}`}>NO</p>
                <div className={`${style.buttons}`}>
                    <Modal />
                    <button className={`${style.botones_indicadores} ${style.delete}`}>Eliminar</button>                
                </div>
            </div>                 
        </div>
    );
}

export default ListaIndicDocente;
