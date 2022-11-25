import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import style from './datosBoletaStudent.module.css';


const DatosBoletaStudent = () => {
    let history = useHistory();
    const datos = useSelector(state => state.descarga.dataBoleta);

    const generarBoleta = () => {
        history.push("/menu-principal/generar-boleta");
    };

    return (
        <>
            {
                datos.length >= 1 &&
                <div className={style.datosBoletaStudent}>
                    <div className={style.datosBoleta}>
                        <p className={style.datosBoleta__dato}><strong>Año escolar: </strong> &nbsp;{datos[0].anio_escolar}</p>
                        <p className={style.datosBoleta__dato}><strong>Grado: </strong> &nbsp;{datos[0].grado.slice(0,1).toUpperCase() + datos[0].grado.slice(1)}</p>
                        <p className={style.datosBoleta__dato}><strong>Momento: </strong> &nbsp;{datos[0].momento.slice(0,1).toUpperCase() + datos[0].momento.slice(1)}</p>
                        <p className={style.datosBoleta__dato}><strong>Estudiante: </strong> &nbsp;{datos[0].nombre_estudiante}</p>
                        <p className={style.datosBoleta__dato}><strong>Cedula escolar: </strong> &nbsp;{datos[0].cedula_estudiante}</p>
                    </div>
                    <div className={style.btnGenerarBoleata}>
                        <button type='submit' className={style.btnGenerarBoleata__button} onClick={generarBoleta} >
                            Generar Boleta
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default DatosBoletaStudent;

