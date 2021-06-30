import style from '../../views/Sistema/Boletas/crearBoleta.module.css';
import ListaEstudiantes from './ListaEstudiantes';

const BuscarEstudiantes = () => {

    return (
        <div>
            <form className={ style.FormSearchStudents}> 
                <label className={ style.searchStudents}>Buscar estudiantes</label>

                <div className={style.formFlex}>
                    <select required className={style.buscarOptions} >
                        <option value="default">Grado</option>
                        <option value="Preescolar">Preescolar</option>
                        <optgroup label="Primaria">
                            <option value="1ero">1er Grado</option>
                            <option value="2do">2do Grado</option>
                            <option value="3ero">3er Grado</option>
                            <option value="4to">4to Grado</option>
                            <option value="5to">5to Grado</option>
                            <option value="6to">6to Grado</option>
                        </optgroup>
                    </select>

                    <select className={style.buscarOptions} >
                        <option>Sección</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>
                </div>
                <input value="Buscar estudiantes" type="submit" className={style.submit} />
            </form>  
            
            <ListaEstudiantes />
               
            
        </div>
    )
}

export default BuscarEstudiantes;
