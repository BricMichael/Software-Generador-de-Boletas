import style from './indicadoresAreas.module.css';

export const IndicadoresEspecialista = ({area, num = 1}) => {

    const handleLiteral = ({target}) => {
        console.log(target.value)
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
                            <p>Seleccione el literal correspodiente</p></td>
                        <td>
                            <input name='a' type="radio"value="E" onChange={handleLiteral} />
                        </td>
                        <td>
                            <input name='a' type="radio"value="B" onChange={handleLiteral} />
                        </td>
                        <td>
                            <input name='a' type="radio"value="RN" onChange={handleLiteral} />
                        </td>
                    </tr>                    
                </tbody>
            </table> 
        </>
    )
}

export default IndicadoresEspecialista;
