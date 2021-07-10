import { useEffect, useState } from 'react';
import style from './indicadoresAreas.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { apiIndicadorlEspecialista } from '../../api/api';



export const IndicadoresEspecialista = ({area, numero,num = 1}) => {
 
    
    const studentSelected  = useSelector( state => state.boleta.studentSelected );
    const gradoState = useSelector( state => state.boleta.grado );
 
    const [ literalIndicadorByArea, setLiteralIndicadorByArea ] = useState({ IndicadorByArea: [], literalSelected: {} });

    useEffect(() => {
        const indicadorEspecialistaByArea = async () => {
            const { data } = await apiIndicadorlEspecialista({grado: gradoState, area});
            setLiteralIndicadorByArea({ IndicadorByArea: data, literalSelected: {} });    
        }    
        gradoState !== '' && indicadorEspecialistaByArea();

    }, [gradoState])


    useEffect(() => {
        setLiteralIndicadorByArea({ ...literalIndicadorByArea, literalSelected: {} }); 
    }, [studentSelected])

    const handleLiteral = ({target}) => {
        const mostrar = literalIndicadorByArea.IndicadorByArea.find( indicador => indicador.literal === target.value);
        mostrar !== undefined  &&  setLiteralIndicadorByArea({ ...literalIndicadorByArea, literalSelected: mostrar }); 
    }
    
    return (
        <>
             <table className={style.tablaIndicadoresBoleta}>  
                <thead className={style.tHeadIndicadoresBoleta}>
                    <tr className={ style.a}>
                        <th>#</th>
                        <th>Área: {area}</th>
                        <th>E</th>
                        <th>B</th>
                        <th>RN</th>
                    </tr>
                </thead>
                <tbody>
                 
                    <tr className={style.l}  >
                        <td><b>#{num++}</b></td>
                        <td className={ style.indicadorDB }> 
                            {  
                                Object.keys(literalIndicadorByArea.literalSelected).length !== 0 
                                    ? <p>{ literalIndicadorByArea.literalSelected.descripcion }</p> 
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
