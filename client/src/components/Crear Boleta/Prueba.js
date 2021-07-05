import style from './indicadoresAreas.module.css';

const Prueba = ({num = 1}) => {
    return (
        <>
            <tr className={style.l} >
                <td><b>#{num++}</b></td>
                <td className={ style.indicadorDB }><p>Aqui va el indicador</p></td>
                <td>
                    <input name={num} type="radio"value="E" />
                </td>
                <td>
                    <input name={num} type="radio"value="B" />
                </td>
                <td>
                    <input name={num} type="radio"value="RN" />
                </td>
            </tr>
        </>
    )
}

export default Prueba;
