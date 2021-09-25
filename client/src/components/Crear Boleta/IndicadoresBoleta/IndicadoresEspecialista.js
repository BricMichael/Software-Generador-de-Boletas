import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './indicadoresAreas.module.css';
import { indicadorEspecialistaByArea, setLiteralEspecialista } from '../../../Redux/actions/boletaActions';




export const IndicadoresEspecialista = ({ area }) => {
    const dispatch = useDispatch();
    
    const resetData = useSelector( state  => state.boleta.reset )
    const gradoState = useSelector( state => state.boleta.gradoSeccion.grado );
 
    const [ literalIndicadorByArea, setLiteralIndicadorByArea ] = useState({ IndicadorByArea: [], literalSelected: {} });
   

    useEffect(() => {
        dispatch( indicadorEspecialistaByArea( gradoState, area, setLiteralIndicadorByArea ) ); 
    }, [gradoState, dispatch, area])


    useEffect(() => {
       resetData !== 0 &&  setLiteralIndicadorByArea({ ...literalIndicadorByArea, literalSelected: {} })
     
    }, [resetData])


    const handleLiteral = ({target}) => {
        const indSelected = literalIndicadorByArea.IndicadorByArea.find( indicador => indicador.literal === target.value);

        if ( indSelected ){
            setLiteralIndicadorByArea({ ...literalIndicadorByArea, literalSelected: indSelected});  
            dispatch( setLiteralEspecialista(indSelected));
        }
    }
        

    return (
        <>
             <table className={style.tableBoleta}>  
                <thead className={style.tableBoletaTh}>
                    <tr className={ style.tableBoletaThTr}>
                        <th className={ style.childOne }>Área: {area}</th>
                        <th className={ style.childOne }>E</th>
                        <th className={ style.childOne }>B</th>
                        <th className={ style.childOne }>RN</th>
                    </tr>
                </thead>
                <tbody className={ style.tableBody }>
                 
                    <tr className={`${style.tableTrBody} animate__animated animate__fadeIn`}>
                        <td className={ `${style.childrenTwo} ${ style.letterLeft }`} > 
                            {  
                                Object.keys(literalIndicadorByArea.literalSelected).length !== 0 
                                    ? <p>{ literalIndicadorByArea.literalSelected.indicador }</p> 
                                    : <b>Seleccione el literal correspodiente</b>
                            }               
                        </td>
                        <td>
                            <input name={area} type="radio" value='E' onChange={handleLiteral} />
                        </td>
                        <td>
                            <input name={area} type="radio" value='B' onChange={handleLiteral} />
                        </td>
                        <td>
                            <input name={area} type="radio" value='RN' onChange={handleLiteral} />
                        </td>
                    </tr>                    
                </tbody>
            </table> 
        </>
    )
}

export default IndicadoresEspecialista;
