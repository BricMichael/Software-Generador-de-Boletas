import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { apiGetUsers } from '../../api/api';
import { alertErrors } from '../../helpers/alerts';
import { useForm } from '../../helpers/useForm'
import { filtroBusqueda } from '../../Redux/actions/indicadoresActions';
import style from './optionsCoordinador.module.css';





const OptionsCoordinador = ({ loadingData, setRolUser }) => {
    const dispatch = useDispatch();
    const [values, handleInputChange] = useForm({ momento: 'Momento 1', cedula: '' })
    const [usuarios, setUsuarios] = useState({ data: [], msgError: '' });
    const { momento, cedula } = values;


    useEffect(() => {
        const getUsers = async () => {
            const { data } = await apiGetUsers('OptionsCoordinador');
            setUsuarios({ ...usuarios, data });
        }

        getUsers();
    }, [])


    const handleState = async (e) => {
        e.preventDefault();
        const user = usuarios.data.find(user => user.cedula === cedula.trim().split(' ')[0]);


        if (!user) alertErrors('No se han encontrado resultados para su búsqueda');
        else {
            loadingData(true);
            setRolUser({ rolUserSelected: user.rol, nameUser: user.nombre });
            const data = await dispatch(filtroBusqueda(momento, 'Indicador', user.id));
            loadingData(false);

            if (data.length === 0) {
                setUsuarios({ ...usuarios, msgError: 'No se han encontrado resultados para el ' + values.momento });

                setTimeout(() => {
                    setUsuarios({ ...usuarios, msgError: '' });
                }, 3000);
            }
        }

    }

    return (
        <div className={style.contentOptionsSearch}>
            <p className={style.coordinador}>Buscar Indicadores</p>

            <form onSubmit={handleState} className={style.optionsCoordinador}>

                <label className={style.labelCoordinador} >Cédula del usuario</label>
                <input
                    type='text'
                    name='cedula'
                    value={cedula}
                    onChange={handleInputChange}
                    placeholder='Cédula o nombre del usuario'
                    autoComplete='off'
                    list='my-list'
                />

                <datalist id='my-list'>
                    {
                        usuarios.data.map(item => (
                            <option key={item.id} value={`${item.cedula}  ${item.nombre}`} />
                        ))
                    }
                </datalist>


                <label className={style.labelCoordinador} >Momento</label>
                <select name='momento' value={momento} onChange={handleInputChange} className={style.momentoSelect}>
                    <option value="Momento 1">Momento 1</option>
                    <option value="Momento 2">Momento 2</option>
                    <option value="Momento 3">Momento 3</option>
                </select>

                <button type="submit">Buscar</button>
            </form>
            {usuarios.msgError.length > 0 && <p className={style.msgNotIndicadores}>{usuarios.msgError}</p>}

        </div>
    )
}

export default OptionsCoordinador;
