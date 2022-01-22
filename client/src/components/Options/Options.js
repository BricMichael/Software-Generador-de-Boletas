import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import style from './options.module.css';
import { useForm } from "../../helpers/useForm";
import { filtroBusqueda } from '../../Redux/actions/indicadoresActions';



const Options = ({ vista, loadingData }) => {

    const dispatch = useDispatch();

    const [respData, setRespData] = useState({ status: false, msgAviso: '' });

    const [values, handleInputChange] = useForm({ momento: 'Momento 1', anioIndicadores: '' })
    const { momento, anioIndicadores } = values;

    const handleStateData = async (e) => {
        e.preventDefault();
        loadingData(true);

        const resp = await dispatch(filtroBusqueda(momento, vista, false, anioIndicadores));
        loadingData(false);

        if (resp.length === 0) {
            setRespData({ status: true, msgAviso: '0 resultados, no se han creado indicadores en el ' + momento })

            setTimeout(() => {
                setRespData({ status: false, msgAviso: '' })
            }, 4200);
        }
    }

    useEffect(() => {
        return () => {
            setRespData({ status: false, msgAviso: '' });
        }
    }, [])

    return (
        <div>
            <p className={style.parrafInformative}>Ver indicadores por momento actual</p>
            <form onSubmit={handleStateData} className={style.optionsFormCont}>
                <select
                    name='momento'
                    value={momento}
                    onChange={handleInputChange}
                    className={style.optionsForm_Select}
                >
                    <option value="Momento 1">Momento 1</option>
                    <option value="Momento 2">Momento 2</option>
                    <option value="Momento 3">Momento 3</option>
                </select>
                <select
                    name='anioIndicadores'
                    value={anioIndicadores}
                    onChange={handleInputChange}
                    className={style.optionsForm_Select}
                    style={{ margin: '0 1.5rem' }}
                >
                    <option value="2022">Año de los indicadores</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                    <option value="2036">2036</option>
                    <option value="2037">2037</option>
                    <option value="2038">2038</option>
                </select>

                <button type="submit">Buscar</button>
            </form>

            {
                respData.status && <p className={style.optionsMsg0results}>
                    {respData.msgAviso}
                </p>
            }
        </div>
    )
}

export default Options;
