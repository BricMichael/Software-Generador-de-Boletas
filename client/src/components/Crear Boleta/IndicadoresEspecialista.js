import { useState } from 'react';
import style from './indicadoresAreas.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiIndicadorlEspecialista } from '../../api/api';


export const IndicadoresEspecialista = ({area, num = 1}) => {
    // const dispatch = useDispatch();
    const gradoState  = useSelector( state => state.boleta.grado )

    const [indicadorSelect, setIndicadorSelect] = useState({})
    

    const indicadorEspecialistaByArea = async(literal) => {
        const { data } = await apiIndicadorlEspecialista({grado: gradoState, area});
        const mostrar = data.find( indicador =>  indicador.literal === literal);
        setIndicadorSelect( mostrar !== undefined  && mostrar  );   
    }


    const handleLiteral = ({target}) => indicadorEspecialistaByArea( target.value );
    

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
                                Object.keys(indicadorSelect).length !== 0 ? <p>{ indicadorSelect.descripcion }</p> 
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
