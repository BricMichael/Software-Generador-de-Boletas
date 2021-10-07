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
                        <p>Docentes: <small>{!data.Docente ? 0 : data.Docente}</small></p>
                    </div>
                    <div className={style.dataMenu}>
                        <p>Especialistas: <small>{!data.Especialista ? 0 : data.Especialista}</small></p>
                    </div>
                    <div className={style.dataMenu}>
                        <p>Coordinador: <small>{!data.Coordinador ? 0 : data.Coordinador}</small></p>
                    </div>
                    <div className={style.dataMenu}>
                        <p>Admin: <small>{!data.Admin ? 0 : data.Admin}</small></p>
                    </div>
                    <div className={style.dataMenu}>
                        <p>Director: <small>{!data.Director ? 0 : data.Director}</small></p>
                    </div>
                </div>

            }
        </>
    );
}

export default InfoRegistros;
