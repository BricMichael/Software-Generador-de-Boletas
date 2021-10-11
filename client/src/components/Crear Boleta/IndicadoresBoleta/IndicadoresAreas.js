import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { literalesByAreaDocente } from '../../../Redux/actions/boletaActions';
import style from './indicadoresAreas.module.css';



const IndicadoresAreas = ({ allIndicadores, area, num = 1 }) => {
    const dispatch = useDispatch();
    const [indicadores, setIndicadores] = useState(allIndicadores);

    // el ultimo indicador dispara el dispatch con todos los con los literales agregados.
    const lastIndicador = useRef(indicadores[indicadores.length - 1].id);


    const literalSeleccionado = (id, { target }) => {
        const dataUpdated = indicadores.map(item => item.id === id ? { ...item, literal: target.value } : item);
        lastIndicador.current === id && dispatch(literalesByAreaDocente({ area, indicadores: dataUpdated }));
        setIndicadores(dataUpdated);

    }


    return (
        <table className={style.tableBoleta}>
            <thead className={style.tableBoletaTh}>
                <tr className={style.tableBoletaThTr}>
                    <th className={style.childOne}>#</th>
                    <th className={style.childOne}>Área: {area}</th>
                    <th className={style.childOne}>E</th>
                    <th className={style.childOne}>B</th>
                    <th className={style.childOne}>RN</th>
                </tr>
            </thead>
            <tbody className={style.tableBody}>
                {
                    allIndicadores.map(value => (
                        <tr className={`${style.tableTrBody} animate__animated animate__fadeIn`} key={value.id}>
                            <td className={style.childrenTwo}><b>#{num++}</b></td>
                            <td className={style.childrenTwo}>{value.indicador}</td>
                            <td>
                                <input name={value.id} type="radio" value="E"
                                    onChange={(e) => literalSeleccionado(value.id, e)} />
                            </td>
                            <td>
                                <input name={value.id} type="radio" value="B"
                                    onChange={(e) => literalSeleccionado(value.id, e)} />
                            </td>
                            <td>
                                <input name={value.id} type="radio" value="RN"
                                    onChange={(e) => literalSeleccionado(value.id, e)} />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default IndicadoresAreas;
