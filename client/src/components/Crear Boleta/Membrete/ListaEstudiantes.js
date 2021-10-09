import style from './membrete.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { actionFiveStudentsButtons, estudianteSelected } from '../../../Redux/actions/boletaActions';



const ListaEstudiantes = ({ num = 1 }) => {
    const dispatch = useDispatch();
    const listFiveStudents = useSelector(state => state.boleta.listFiveStudents);

    const handleStudent = (dataAlumno) => {
        dataAlumno.docente = JSON.parse(localStorage.getItem('userActive')).nombre;
        dispatch(estudianteSelected(dataAlumno));
    }

    const verNuevosAlumnos = (btn) => dispatch(actionFiveStudentsButtons(btn));


    return (
        <div className={style.listaEstudiantes}>
            <h3>Lista de estudiantes</h3>
            {
                listFiveStudents.length !== 0 &&
                <>

                    <table className={style.table}>
                        <thead className={style.tableThead} >
                            <tr className={style.tableTr}>
                                <th className={style.th} >#</th>
                                <th className={style.th} >Nombre</th>
                                <th className={style.th} >Grado</th>
                                <th className={style.th} >Secci&oacute;n</th>
                                <th className={style.th} >Boleta</th>
                            </tr>
                        </thead>
                        <tbody className={style.tbody}>
                            {
                                listFiveStudents.map(alumno => (
                                    <tr className={`${style.listaFiveFlex} animate__animated animate__fadeIn`}
                                        onClick={() => handleStudent(alumno)} key={alumno.id}>
                                        <td className={style.indicee}>#{num++}</td>
                                        <td className={style.borderRadius}>{alumno.nombres}</td>
                                        <td className={style.borderRadius}>{alumno.grado}</td>
                                        <td className={style.borderRadius}>{alumno.seccion}</td>
                                        <td className={style.borderRadius}><strong>{alumno.boleta_generada}</strong></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <button type="submit" onClick={() => verNuevosAlumnos('back')} id='backStudents'>
                        Anteriores alumnos
                    </button>
                    <button type="submit" onClick={() => verNuevosAlumnos('next')} id='nextStudents'
                    >Siguientes alumnos
                    </button>
                </>
            }
        </div>
    );
}

export default ListaEstudiantes;
