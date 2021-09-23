import style from '../../views/Sistema/Boletas/crearBoleta.module.css';
import BuscarEstudiantes from "./BuscarEstudiantes";
import CabeceraDatosAlumno from "./CabeceraDatosAlumno";



const Cabecera = () => {
    return (
        <div className={style.firstComponents}  id="topOfPage">
            <BuscarEstudiantes />
            <CabeceraDatosAlumno />
        </div>
    )
}

export default Cabecera;
