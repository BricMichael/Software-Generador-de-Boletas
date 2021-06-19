import Modal from '../../components/Modal/Modal';
import style from './listaDocente.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIndicador } from '../../Redux/actions/indicadoresActions';

const ListaIndicDocente = ({ count = 1 }) => {
    const dispatch = useDispatch();
    const { indicadoresByUser } = useSelector( state  => state.indicador);

    const eliminarIndicador = (id) => dispatch( deleteIndicador(id) );

    

    return (
        <div className={`${style.tabla_contain}`}>
            <div className={`${style.titulos_tabla}`}>
                <h3 className={`${style.titulosIndividuales} ${style.hastag}`}>#</h3>
                <h3 className={`${style.tituloIndicador} ${style.titulosIndividuales}`}>Indicador</h3>
                <h3 className={`${style.areaTitulo} ${style.titulosIndividuales}`}>Área</h3>
                <h3 className={`${style.titulosIndividuales}`}>Literal</h3>
                <h3 className={`${style.titulosIndividuales} ${style.titleCEsp}`}>Cond. Especial</h3>
            </div>   

            { indicadoresByUser.length === 0 && 
            <div className={ style.zeroIndicador }>¡Aquí se mostrar&aacute;n tus indicadores!</div>
            }         

            {
                indicadoresByUser.map( indicador => (
                    <div className={`${style.data_indicadores} animate__animated animate__fadeIn`} key={indicador.id_indicador }>
                        <h3 className={`${style.parrafosData}`}>{ count++ }</h3>
                        <p className={`${style.rezise_indicador} ${style.parrafosData}`}>{ indicador.descripcion }</p>
                        <p className={`${style.parrafosData}`}>{ indicador.area }</p>
                        <p className={`${style.parrafosData}`}>{ indicador.literal }</p>
                        <p className={`${style.parrafosData} ${style.condEspecial}`}>{ indicador.condicion_especial }</p>
                        <div className={`${style.buttons}`}>
                            <Modal indicador={ indicador } />
                            <button className={`${style.botones_indicadores} ${style.delete}`}
                                onClick={ () => eliminarIndicador(indicador.id_indicador ) }
                            >
                                Eliminar
                            </button>                
                        </div>
                    </div>
                ))
            }
                          
        </div>
    );
}

export default ListaIndicDocente;


{/* <div className={`${style.data_indicadores}`}> */}
{/* <h3 className={`${style.parrafosData}`}>1</h3>
<p className={`${style.rezise_indicador} ${style.parrafosData}`}>Se le llama indicador a cualquier objeto o persona que se encargue de mostrar.Se le llama indicador a cualquier objecto.</p>
<p className={`${style.parrafosData}`}>Música</p>
<p className={`${style.parrafosData}`}>MB</p>
<p className={`${style.parrafosData} ${style.condEspecial}`}>NO</p>
<div className={`${style.buttons}`}>
    <Modal />
    <button className={`${style.botones_indicadores} ${style.delete}`}>Eliminar</button>                
</div> */}