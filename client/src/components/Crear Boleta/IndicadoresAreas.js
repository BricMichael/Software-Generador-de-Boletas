import style from './indicadoresAreas.module.css';

const IndicadoresAreas = ({area, indicador, num = 1}) => {
    return (
        <>
             <table className={style.tablaIndicadoresBoleta}>  
                <thead className={style.tHeadIndicadoresBoleta}>
                    <tr className={ style.a}>
                        <th>#</th>
                        <th>Área: { area}</th>
                        <th>E</th>
                        <th>B</th>
                        <th>RN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={style.l}>
                        <td><b>#{num++}</b></td>
                        <td className={ style.indicadorDB }>{ indicador }</td>
                        <td>
                            <input name={area} type="radio"value="E" />
                        </td>
                        <td>
                            <input name={area} type="radio"value="B" />
                        </td>
                        <td>
                            <input name={area} type="radio"value="RN" />
                        </td>
                    </tr>        
                </tbody>
            </table>   
        </>
    )
}

export default IndicadoresAreas;
