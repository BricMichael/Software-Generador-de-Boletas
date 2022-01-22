import { useSelector, useDispatch } from 'react-redux';
import { generarBoletaExistente } from '../../Redux/actions/descargasBoletaActions';
import style from './datosBoletaStudent.module.css';




const DatosBoletaStudent = () => {
    const dispatch = useDispatch();
    const datos = useSelector(state => state.descarga.dataBoleta);

    const generarBoleta = () => dispatch(generarBoletaExistente(datos[0]));

    return (
        <>
            {
                datos.length >= 1 &&
                <div className={style.datosBoletaStudent}>
                    <div className={style.datosBoleta}>
                        <p className={style.datosBoleta__dato}><strong>Año escolar: </strong> &nbsp;{datos[0].anio_escolar}</p>
                        <p className={style.datosBoleta__dato}><strong>Grado: </strong> &nbsp;{datos[0].grado}</p>
                        <p className={style.datosBoleta__dato}><strong>Momento: </strong> &nbsp;{datos[0].momento}</p>
                        <p className={style.datosBoleta__dato}><strong>Estudiante: </strong> &nbsp;{datos[0].nombre_estudiante}</p>
                        <p className={style.datosBoleta__dato}><strong>Docente: </strong> &nbsp;{datos[0].nombre_docente}</p>
                        <p className={style.datosBoleta__dato}><strong>Cedula escolar: </strong> &nbsp;{datos[0].cedula_estudiante}</p>
                        <p className={style.datosBoleta__dato}><strong>Fecha de creación: </strong> &nbsp;{datos[0].fecha_de_creacion}</p>
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

