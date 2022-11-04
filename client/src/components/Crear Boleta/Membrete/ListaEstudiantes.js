import { useSelector, useDispatch } from 'react-redux';
import style from './membrete.module.css';
import { actionFiveStudentsButtons, estudianteSelected } from '../../../Redux/actions/boletaActions';



const ListaEstudiantes = ({ loadindData, setLoadindData }) => {
    const dispatch = useDispatch();
    const listFiveStudents = useSelector(state => state.boleta.listFiveStudents);

    const handleStudent = (dataAlumno) => {
        dataAlumno.docente = JSON.parse(localStorage.getItem('userActive')).nombre;
        dispatch(estudianteSelected(dataAlumno));
    }

    const verNuevosAlumnos = async (btn) => {
        setLoadindData(true);
        await dispatch(actionFiveStudentsButtons(btn))
        setLoadindData(false);
    };


    return (
        <div className={style.listaEstudiantes}>
            <h3>Lista de estudiantes</h3>
            {
                listFiveStudents.length !== 0 &&
                <>
                    <table className={style.table}>
                        <thead className={style.tableThead} >
                            <tr className={style.tableTr}>
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
                                        <td className={style.borderRadius}>{alumno.nombres}</td>
                                        <td className={style.borderRadius}>{alumno.grado === 'nivel1' ? 'Nivel 1' : alumno.grado === 'nivel2' ? 'Nivel 2' : 'Nivel 3'}</td>
                                        <td className={style.borderRadius}>{alumno.seccion}</td>
                                        <td className={style.borderRadius}><strong>{alumno.boleta_generada}</strong></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <div className={style.listaStudens__Buttons}>
                        <button type="submit" onClick={() => verNuevosAlumnos('back')} id='backStudents' style={{ display: 'none' }}>
                            Anteriores alumnos
                        </button>
                        <button type="submit" onClick={() => verNuevosAlumnos('next')} id='nextStudents'>
                            Siguientes alumnos
                        </button>                    
                    </div>
                </>
            }
            {
                loadindData
                    ? <p className={style.msgListStudents}>Cargando...</p>
                    : listFiveStudents.length !== 0
                        ? ''
                        : <p className={style.msgListStudents} >Selecciona tus estudiantes, Resultados (0)</p>
            }
        </div>
    );
}

export default ListaEstudiantes;
