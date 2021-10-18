import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { listFiveStudents } from '../../../Redux/actions/boletaActions';
import style from './membrete.module.css';
import ListaEstudiantes from './ListaEstudiantes';




const BuscarEstudiantes = () => {
    const dispatch = useDispatch()

    const [loadindData, setLoadindData] = useState(false);
    const [busqueda, setBusqueda] = useState({ grado: '', seccion: '' })
    const { grado, seccion } = busqueda;

    const handleOptions = ({ target }) => {
        setBusqueda({
            ...busqueda,
            [target.name]: target.value
        })
    }
    const subtmiForm = async (e) => {
        e.preventDefault();
        setLoadindData(true);
        await dispatch(listFiveStudents(busqueda));
        setLoadindData(false);
    }

    return (
        <div className={style.child1}>
            <form className={style.FormSearchStudents} onSubmit={subtmiForm}>
                <label className={style.searchStudents}>Buscar estudiantes</label>

                <div className={style.formFlex}>
                    <select required className={style.buscarOptions} onChange={handleOptions} name="grado" value={grado}>
                        <option value="default">Grado</option>
                        <option value="1">1er Grado</option>
                        <option value="2">2do Grado</option>
                        <option value="3">3er Grado</option>
                        <option value="4">4to Grado</option>
                        <option value="5">5to Grado</option>
                        <option value="6">6to Grado</option>
                    </select>

                    <select className={style.buscarOptions} onChange={handleOptions} name="seccion" value={seccion}>
                        <option value="default" >Sección</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </div>
                <input value="Buscar estudiantes" type="submit" className={style.submit} />
            </form>

            <ListaEstudiantes loadindData={loadindData} setLoadindData={setLoadindData} />
        </div>
    )
}

export default BuscarEstudiantes;
