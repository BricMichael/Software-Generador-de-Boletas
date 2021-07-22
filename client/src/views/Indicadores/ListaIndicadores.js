import { useState, useEffect } from 'react';
import style from './listIndicadores.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIndicador, indicadorActivo } from '../../Redux/actions/indicadoresActions';
import { Link as Scroll } from 'react-scroll';

const ListaIndicadores = ({ count = 1 }) => {
    const dispatch = useDispatch();
    const [ handleMaterias, setHandleMaterias ] = useState([]);
    const { indicadoresByUser, materias} = useSelector( state => state.indicador );

    const { materiasDocente, materiasEspecialista } = materias;
    const { rol } = JSON.parse( localStorage.getItem('userActive') );

    const materiasShowOptions = rol === 'especialista' ? materiasEspecialista : materiasDocente;
    const indicadoresOfUser = handleMaterias.length !== 0 ? handleMaterias : indicadoresByUser;

    useEffect(() => {  
        handleMaterias.length !== 0 &&  setHandleMaterias([]);
    }, [ indicadoresByUser ])
    
    const editIndicador = ( dataUpdate ) => {  
        delete dataUpdate.id_creador;
        delete dataUpdate.fecha_creacion;
        dispatch( indicadorActivo( dataUpdate ));
    }
    const handleDisplay = ( {target:{value}} ) => setHandleMaterias( indicadoresByUser.filter( type => type.area === value ) );
        
    const eliminarIndicador = (id) => dispatch( deleteIndicador(id) );  

    return (
        <div className={style.solucion}>
     {   indicadoresByUser.length !== 0 && 
        <table id={style.tablaViewIndicadores}>  
            <thead id={style.headTablaIndicadores}>
                <tr className={ style.cabeceraTitles}>
                    <th className={ style.th2 }>#</th>
                    <th className={ style.th2 }>Indicador</th>
                    <th className={ style.th2 }>&Aacute;rea</th>
                    <th className={ style.th2 }>Momento</th>
                    <th className={ style.th2 }>C.E</th>         
                    {    rol === 'especialista' &&
                            <>
                                <th className={ style.th2 }>Literal</th>
                                <th className={ style.th2 }>Grado</th>
                            </>
                    }            
                    <th className={ style.th2 }>Acciones</th>
                </tr>
            </thead>
            <tbody className={style.indicadorBody}>
                {
                    indicadoresOfUser.map( indicador => (
                        <tr className={`${style.indIndividual} animate__animated animate__fadeIn`} key={ indicador.id }>
                            <th className={ style.padding }>#{ count++ }</th>
                            <th className={ style.padding }>{ indicador.indicador }</th>
                            <th className={ style.padding }>{ indicador.area }</th>
                            <th className={ style.padding }>{ indicador.momento }</th>
                            <th className={ style.padding }>{ indicador.condicion_especial }</th>
                            {
                                rol === 'especialista' &&
                                <>
                                <th className={ style.padding }>{ indicador.literal }</th>
                                <th className={ style.padding }>{ indicador.grado }</th>
                                </>
                            }
                            <th className={ `${style.padding} ${style.thContentButtons}`}>
                                <Scroll className={`${style.botones_indicadores} ${style.edit}`} to='stopButtonEdit' smooth="true"  duration="400" onClick={ () => editIndicador( indicador ) } >
                                    Editar
                                </Scroll> 
                                <button className={ `${style.botones_indicadores} ${style.delete}` }
                                    onClick={ () => eliminarIndicador( indicador.id ) } >
                                    Eliminar
                                </button>   
                            </th>
                        </tr>
                    ))
                }                    
            </tbody>
        </table> 
    }  
    {
        indicadoresByUser.length !== 0 && 
        <select className={ style.showOptionsOfMaterias } onChange={ handleDisplay }>
            <option value='indicadoresByUser'>Todas las áreas</option>
            { materiasShowOptions.map( value => (
                <option key={ value.materia } value={ value.materia }>{ value.materia }</option>
            )) }
        </select> 
    } 
        
    </div>    
    );
}

export default ListaIndicadores;
