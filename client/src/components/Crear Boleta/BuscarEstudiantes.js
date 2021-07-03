import style from '../../views/Sistema/Boletas/crearBoleta.module.css';
import ListaEstudiantes from './ListaEstudiantes';
import {useDispatch} from 'react-redux';
import { listFiveStudents } from '../../Redux/actions/boletaActions';
const BuscarEstudiantes = () => {

    const dispatch = useDispatch()
    const prueba = (e) => {
        e.preventDefault();
        dispatch( listFiveStudents() );
    }

    return (
        <div>
            <form className={style.FormSearchStudents}>
                <label className={style.searchStudents}>Buscar estudiantes</label>

                <div className={style.formFlex}>
                    <select required className={style.buscarOptions} >
                        <option value="default">Grado</option>
                            <option value="1ero">1er Grado</option>
                            <option value="2do">2do Grado</option>
                            <option value="3ero">3er Grado</option>
                            <option value="4to">4to Grado</option>
                            <option value="5to">5to Grado</option>
                            <option value="6to">6to Grado</option>
                    </select>

                    <select className={style.buscarOptions} >
                        <option value="default" >Sección</option>
                        <option value="A" >A</option>
                        <option value="B" >B</option>
                        <option value="C" >C</option>
                    </select>
                </div>
                <input value="Buscar estudiantes" type="submit" 
                   onClick={ prueba } className={style.submit} />
            </form>

            <ListaEstudiantes />


        </div>
    )
}

export default BuscarEstudiantes;
