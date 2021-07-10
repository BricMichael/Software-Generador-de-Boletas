import style from '../../views/Sistema/Boletas/crearBoleta.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { estudianteSelected, nextFiveStudents} from '../../Redux/actions/boletaActions';



const ListaEstudiantes = ({ num = 1, seccion }) => {
    const dispatch = useDispatch();
    const listFiveStudents = useSelector( state => state.boleta.listFiveStudents );

    const handleStudent = ( dataAlumno ) => {
       
        dataAlumno.docente = JSON.parse( localStorage.getItem('userActive')).nombre;
        dispatch( estudianteSelected(dataAlumno) );
    }

    const siguientesAlumnos = () => dispatch( nextFiveStudents( seccion ) );

    return (
        <div className={style.listaEstudiantes}>
            <h3>Lista de estudiantes</h3>
            <table className={ style.table}>  
                <thead>
                    <tr className={ style.tableTr}>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Grado</th>
                        <th>Secci&oacute;n</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       listFiveStudents.map( alumno => (
                        <tr className={`${style.listaFiveFlex} animate__animated animate__fadeIn`} 
                        onClick={() => handleStudent(alumno)} key={alumno.id}>
                            <td className={style.indicee}>#{num++}</td>
                            <td className={ style.borderRadius }>{ alumno.nombres }</td>
                            <td className={ style.borderRadius }>{ alumno.grado }</td>
                            <td className={ style.borderRadius }>{ alumno.seccion }</td>
                        </tr>
                       ))
                   }
                </tbody>
            </table>
            {
                listFiveStudents.length !== 0 && <button type="submit" onClick={ siguientesAlumnos }>Siguientes alumnos</button>
            }
        </div>
    );
}

export default ListaEstudiantes;
