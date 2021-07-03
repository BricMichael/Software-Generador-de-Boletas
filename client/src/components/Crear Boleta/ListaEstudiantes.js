import style from '../../views/Sistema/Boletas/crearBoleta.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { estudianteSelected } from '../../Redux/actions/boletaActions';



const ListaEstudiantes = ({num = 1, grado, alumno, nombre}) => {
    const dispatch = useDispatch();
    const { listFiveStudents } = useSelector( state => state.boleta );

    const handleStudent = ( dataAlumno ) => {
        dataAlumno.docente = JSON.parse( localStorage.getItem('userActive')).nombre;
        dispatch( estudianteSelected(dataAlumno) );
    }
    
    return (
        <div className={style.listaEstudiantes}>
            <h3>Lista de estudiantes</h3>
            {/* { listFiveStudents.length !== 0 &&  */}
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
                        <tr key={alumno.nombre} className={`${style.listaFiveFlex} animate__animated animate__fadeIn`} 
                             key={num} onClick={() => handleStudent(alumno)} >
                            <td className={style.indicee}>#{num++}</td>
                            <td className={ style.borderRadius }>{ alumno.nombres }</td>
                            <td className={ style.borderRadius }>{ alumno.grado }</td>
                            <td className={ style.borderRadius }>{ alumno.seccion }</td>
                        </tr>
                       ))
                   }
                </tbody>
            </table>
            <button type="submit">Siguientes alumnos</button>

        </div>
    );
}

export default ListaEstudiantes;
