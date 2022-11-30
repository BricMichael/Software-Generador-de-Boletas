import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { listFiveStudents } from '../../../Redux/actions/boletaActions';
import style from './membrete.module.css';
import ListaEstudiantes from './ListaEstudiantes';
import { alertErrors } from '../../../helpers/alerts'




const BuscarEstudiantes = () => {
    const dispatch = useDispatch()

    const [loadindData, setLoadindData] = useState(false);
    const [busqueda, setBusqueda] = useState({ grado: '', seccion: 'U' })
    const { grado, seccion } = busqueda;

    const handleOptions = ({ target }) => {
        setBusqueda({
            ...busqueda,
            [target.name]: target.value
        })
    }
    const subtmiForm = async (e) => {
        e.preventDefault();
        if( !busqueda.grado ) return alertErrors('Uno o más campos sin seleccionar.', '#032a69', 'Error');
        setLoadindData(true);
        await dispatch(listFiveStudents(busqueda));
        setLoadindData(false);
    }

    return (
        <div className={style.child1}>
        <label className={style.searchStudents}>Buscar estudiantes</label>
            <form className={style.FormSearchStudents} onSubmit={subtmiForm}>

                <div className={style.formFlex}>
                    <select required className={style.buscarOptions} onChange={handleOptions} name="grado" value={grado}>
                        <option value="default">Grado</option>
                        <option value="nivel1">Nivel 1</option>
                        <option value="nivel2">Nivel 2</option>
                        <option value="nivel3">Nivel 3</option>
                    </select>

                    <select className={style.buscarOptions} onChange={handleOptions} name="seccion" value={seccion}>
                        <option value="U">Sección (U)</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>                
                    </select>
                    <input value="Buscar estudiantes" type="submit" className={style.submit} />
                </div>
            </form>

            <ListaEstudiantes loadindData={loadindData} setLoadindData={setLoadindData} />
        </div>
    )
}

export default BuscarEstudiantes;
