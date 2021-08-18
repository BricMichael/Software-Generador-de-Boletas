import style from './materias.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { apiDeleteRegister } from '../../api/api';
import { materiasExistentes } from '../../Redux/actions/boletaActions';




const TablaMaterias = () => {
    const dispatch = useDispatch();
    const { materiasDocente, materiasEspecialista}  = useSelector( state => state.indicador.materias );
    const allMaterias = [ ...materiasDocente, ...materiasEspecialista ];


    const deleteMateria = async(id) => {
        
        const { isConfirmed } = await Swal.fire({
            title: '¿Eliminar Materia?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
    })
        if( isConfirmed ) {
            await apiDeleteRegister(id, 'materias');
            Swal.fire( { icon: 'success', title: 'La acción ha sido completada', showConfirmButton: false, timer: 1100, position: 'center' });
            dispatch( materiasExistentes() );
        }
    }

    return (
        <div className={style.contentMaterias }>
                <div className={ style.divButtonNewMateria }>
                    <button type='button' className={style.buttonNewMateria} >Crear Materia</button>
                </div>
                <table className={ style.tableMaterias}>  
                    <thead className={ style.tableMateriasThead} >
                        <tr className={ style.tableMateriasTr}>
                            <th className={ style.tableMateriasTh } >Materias</th>
                            <th className={ style.tableMateriasTh } >Tipo</th>
                            <th className={ style.tableMateriasTh } >Acción</th>
                        </tr>
                        </thead>
                    <tbody className={ style.tableMateriasTbody }>      
                        {
                            allMaterias.map( value => (
                                <tr className={`${style.tableMateriasTrBody} animate__animated animate__fadeIn`} key={value.id}>
                                    <td className={ style.tableMateriaschildrenBody }>{value.materia}</td>
                                    <td className={ style.tableMateriaschildrenBody }>{value.tipo}</td>
                                    <td className={ style.tableMateriaschildrenBody}>
                                        <button className={ style.deleteMateria} onClick={ () => deleteMateria(value.id) } type='button' >
                                            Eliminar
                                        </button>  
                                    </td>
                                </tr>
                            ))
                        }
                                 
                    </tbody>
                </table>
            
        </div>
    )
}

export default TablaMaterias
