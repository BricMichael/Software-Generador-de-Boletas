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
        <table className={style.tableBoleta}>  
            <thead className={style.tableBoletaTh}>
                <tr className={ style.tableBoletaThTr}>
                    <th className={ style.childOne }>#</th>
                    <th className={ style.childOne }>Área: { area }</th>
                    <th className={ style.childOne }>E</th>
                    <th className={ style.childOne }>B</th>
                    <th className={ style.childOne }>RN</th>
                </tr>
            </thead>
            <tbody className={ style.tableBody }>
            {
                allIndicadores.map( indicador => (
                    <tr className={`${style.tableTrBody} animate__animated animate__fadeIn`} key={ indicador}>
                        <td className={ style.childrenTwo }><b>#{num++}</b></td>
                        <td className={ style.childrenTwo }>{ indicador }</td>
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
    )
}

export default IndicadoresAreas;
