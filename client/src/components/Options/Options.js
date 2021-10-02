import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import style from './options.module.css';
import { useForm } from "../../helpers/useForm";
import { filtroBusqueda } from '../../Redux/actions/indicadoresActions';



const Options = ({ vista, loadingData }) => {

    const dispatch = useDispatch();

    const [respData, setRespData] = useState({ status: false, msgAviso: '' });

    const [values, handleInputChange] = useForm({ momento: 'Momento 1' })
    const { momento } = values;

    const handleStateData = async (e) => {
        e.preventDefault();
        loadingData(true);

        const resp = await dispatch(filtroBusqueda(momento, vista));

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
