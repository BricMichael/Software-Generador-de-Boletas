import style from '../../views/Sistema/Boletas/crearBoleta.module.css';
import ListaEstudiantes from './ListaEstudiantes';
import {useDispatch} from 'react-redux';
import { listFiveStudents } from '../../Redux/actions/boletaActions';
import { useState } from 'react';



const BuscarEstudiantes = () => {
    const dispatch = useDispatch()

    const [busqueda, setBusqueda] = useState({grado: '', seccion: ''})
    const { grado, seccion } = busqueda;

    const handleOptions = ({target}) => {
        setBusqueda({
            ...busqueda,
            [target.name]: target.value
        })
    }

    const subtmiForm = (e) => {
        e.preventDefault();
        dispatch( listFiveStudents(busqueda) );
    }
    
    return (
        <div>
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

                    <select className={style.buscarOptions}  onChange={handleOptions} name="seccion" value={seccion}>
                        <option value="default" >Sección</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <input value="Buscar estudiantes" type="submit" className={style.submit} />
            </form>

            <ListaEstudiantes grado={grado} seccion={seccion} />


        </div>
    )
}

export default BuscarEstudiantes;
