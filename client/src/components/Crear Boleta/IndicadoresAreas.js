import style from './indicadoresAreas.module.css';



const IndicadoresAreas = ({ allIndicadores, area ,num = 1}) => {
    allIndicadores.shift();
   
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
                        <tr className={style.l} >
                            <td><b>#{num++}</b></td>
                            <td className={ style.indicadorDB }>{ indicador }</td>
                            <td>
                                <input name={indicador} type="radio"value="E" />
                            </td>
                            <td>
                                <input name={indicador} type="radio"value="B" />
                            </td>
                            <td>
                                <input name={indicador} type="radio"value="RN" />
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


 