import { useDispatch } from 'react-redux';
import { updateLiteralOfIndicador } from '../../Redux/actions/boletaActions';
import style from './indicadoresAreas.module.css';



const IndicadoresAreas = ({ allIndicadores, area ,num = 1}) => {
    allIndicadores.shift();
    const dispatch = useDispatch();
    const literalSeleccionado = ( descIndicador, {target} ) => {
       dispatch( updateLiteralOfIndicador( descIndicador, target.value ) )
    } 
    return (
        <>
             <table className={style.tablaIndicadoresBoleta}>  
                <thead className={style.tHeadIndicadoresBoleta}>
                    <tr className={ style.a}>
                        <th>#</th>
                        <th>Área: { area }</th>
                        <th>E</th>
                        <th>B</th>
                        <th>RN</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       allIndicadores.map( indicador => (
                        <tr className={style.l} key={ indicador}>
                            <td><b>#{num++}</b></td>
                            <td className={ style.indicadorDB }>{ indicador }</td>
                            <td>
                                <input name={indicador} type="radio"value="E" 
                                onChange={ (e) => literalSeleccionado(indicador, e) } />
                            </td>
                            <td>
                                <input name={indicador} type="radio"value="B" 
                                onChange={ (e) => literalSeleccionado(indicador, e) } />
                            </td>
                            <td>
                                <input name={indicador} type="radio"value="RN" 
                                onChange={ (e) => literalSeleccionado(indicador, e) } />
                            </td>
                        </tr>     
                       ))
                   }
                </tbody> 
            </table>   
        </>
    )
}

export default IndicadoresAreas;


 