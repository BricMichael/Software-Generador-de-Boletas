import style from './listaDocente.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIndicador, indicadorActivo } from '../../Redux/actions/indicadoresActions';


const ListaIndicDocente = ({ count = 1 }) => {
    const dispatch = useDispatch();
    const { indicadoresByUser } = useSelector( state  => state.indicador);
    
    const editIndicador = ( dataUpdate ) => {  
        delete dataUpdate.creador_personal;
        delete dataUpdate.fecha_creacion;
    
        dispatch( indicadorActivo( dataUpdate ));
    }
    
    const eliminarIndicador = (id) => dispatch( deleteIndicador(id) );   

    return (
        <div className={`${style.tabla_contain}`}>
            <div className={`${style.titulos_tabla}`}>
                <h3 className={`${style.titulosIndividuales} ${style.hastag}`}>#</h3>
                <h3 className={`${style.tituloIndicador} ${style.indicadorTitle}`}>Indicador</h3>
                <h3 className={`${style.indicadorArea}`}>Área</h3>
                <h3 className={`${style.titulosIndividuales} ${style.indicadorLiteral}`}>Literal</h3>
                <h3 className={`${style.titulosIndividuales} ${style.titleCEsp}`}>Cond. Especial</h3>
                <h3 className={`${style.titulosIndividuales} ${style.acciones}`}>Acciones</h3>
            </div>

            { indicadoresByUser.length === 0 && 
                <div className={ style.zeroIndicador }>¡Aquí se mostrar&aacute;n tus indicadores!</div>
            }  

            {
            indicadoresByUser.map( (indicador) => (
            <div className={`${style.data_indicadores} animate__animated animate__fadeIn`} key={ indicador.id_indicador }>
                <h3 className={`${style.parrafosData}`}>{ count++ }</h3>
                <p className={`${style.rezise_indicador} ${style.parrafosData}`}>{ indicador.descripcion }</p>
                <p className={`${style.parrafosData}`}>{ indicador.area }</p>
                <p className={`${style.parrafosData} ${style.literalP}`}>{ indicador.literal }</p>
                <p className={`${style.parrafosData} ${style.condEspecial}`}>{ indicador.condicion_especial }</p>
                <div className={`${style.buttons}`}>
                    <button className={`${style.botones_indicadores} ${style.edit}`}
                        onClick={ () => editIndicador( indicador ) }
                    >
                        Editar
                    </button> 
                    <button className={ `${style.botones_indicadores} ${style.delete}` }
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

