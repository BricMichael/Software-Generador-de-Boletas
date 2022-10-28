import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiTotalUsersByRol } from '../../api/api';
import style from './infoRegistros.module.css';

const InfoRegistros = () => {

    const [totales, setTotales] = useState({ data: {}, totalUsers: 0 });
    const { data, totalUsers } = totales;

    const datos = useSelector(state => state.config.dataNameUsers);

    const getTotalUsers = async () => {
        const { data } = await apiTotalUsersByRol();
        let dataToState = {}
        const { totalUsers } = data.pop();

        for (const item of data) dataToState[item.rol] = item.total;
        setTotales({ data: dataToState, totalUsers })
    }
   
    useEffect(() => {
        datos.length !== 0 && getTotalUsers();

        return () => {
            setTotales({ data: {}, totalUser: 0 });
        }
    }, [datos])

    return (
        <>
            {
                totalUsers >= 1 &&
                <div className={style.menuInformativo}>
                    <div className={style.dataMenu}>
                        <p>Usuarios registrados: <small>{totalUsers}</small></p>
                    </div>
                    <div className={style.dataMenu}>
                        <p>Docentes: <small>{!data.docente ? 0 : data.docente}</small></p>
                    </div>
                    <div className={style.dataMenu}>
                        <p>Especialistas: <small>{!data.especialista ? 0 : data.especialista}</small></p>
                    </div>
                    <div className={style.dataMenu}>
                        <p>Coordinador: <small>{!data.coordinador ? 0 : data.coordinador}</small></p>
                    </div>
                    <div className={style.dataMenu}>
                        <p>Admin: <small>{!data.admin ? 0 : data.admin}</small></p>
                    </div>
                    <div className={style.dataMenu}>
                        <p>Director: <small>{!data.director ? 0 : data.director}</small></p>
                    </div>
                </div>

            }
        </>
    );
}

export default InfoRegistros;
