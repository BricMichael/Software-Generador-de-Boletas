import BuscarEstudiantes from './Membrete/BuscarEstudiantes';
import StudentSelected from './Membrete/StudentSelected';

import style from './Membrete/membrete.module.css';

const Cabecera = () => {
    return (
        <div className={style.componentsTopStudent}>
            <BuscarEstudiantes />
            <StudentSelected />
        </div>
    )
}

export default Cabecera;
