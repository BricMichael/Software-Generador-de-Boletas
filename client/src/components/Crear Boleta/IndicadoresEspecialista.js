import { useEffect, useState } from 'react';
import style from './indicadoresAreas.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { apiIndicadorlEspecialista } from '../../api/api';



export const IndicadoresEspecialista = ({area, num = 1}) => {
 
    
    const studentSelected  = useSelector( state => state.boleta.studentSelected );
    const gradoState = useSelector( state => state.boleta.gradoSeccion.grado );
 
    const [ literalIndicadorByArea, setLiteralIndicadorByArea ] = useState({ IndicadorByArea: [], literalSelected: {} });

    useEffect(() => {
        const indicadorEspecialistaByArea = async () => {
            const { data } = await apiIndicadorlEspecialista({grado: gradoState, area});
            setLiteralIndicadorByArea({ IndicadorByArea: data, literalSelected: {} });    
        }    
        gradoState && indicadorEspecialistaByArea();

    }, [gradoState])


    useEffect(() => {
       studentSelected.nombres && setLiteralIndicadorByArea({ ...literalIndicadorByArea, literalSelected: {} }); 
    }, [studentSelected])

    const handleLiteral = ({target}) => {
        const mostrar = literalIndicadorByArea.IndicadorByArea.find( indicador => indicador.literal === target.value);
        mostrar !== undefined  &&  setLiteralIndicadorByArea({ ...literalIndicadorByArea, literalSelected: mostrar }); 
    }
  
    return (
        <>
             <table className={style.tableBoleta}>  
                <thead className={style.tableBoletaTh}>
                    <tr className={ style.tableBoletaThTr}>
                        <th className={ style.childOne }>#</th>
                        <th className={ style.childOne }>Área: {area}</th>
                        <th className={ style.childOne }>E</th>
                        <th className={ style.childOne }>B</th>
                        <th className={ style.childOne }>RN</th>
                    </tr>
                </thead>
                <tbody className={ style.tableBody }>
                 
                    <tr className={`${style.tableTrBody} animate__animated animate__fadeIn`}>
                        <td className={ style.childrenTwo }><b>#{num++}</b></td>
                        <td className={ style.childrenTwo } > 
                            {  
                                Object.keys(literalIndicadorByArea.literalSelected).length !== 0 
                                    ? <p>{ literalIndicadorByArea.literalSelected.indicador }</p> 
                                    : <p>Seleccione el literal correspodiente</p>
                            }               
                        </td>
                        <td>
                            <input name={area} type="radio"value="E" onChange={handleLiteral} />
                        </td>
                        <td>
                            <input name={area} type="radio"value="B" onChange={handleLiteral} />
                        </td>
                        <td>
                            <input name={area} type="radio"value="RN" onChange={handleLiteral} />
                        </td>
                    </tr>                    
                </tbody>
            </table> 
        </>
    )
}

export default IndicadoresEspecialista;
