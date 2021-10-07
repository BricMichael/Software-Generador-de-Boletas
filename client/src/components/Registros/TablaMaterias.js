import style from './materias.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertDeleteItems, alertSuccess } from '../../helpers/alerts';
import { apiDeleteRegister } from '../../api/api';
import { materiasExistentes } from '../../Redux/actions/boletaActions';
import ModalMaterias from '../Modal/ModalMaterias';




const TablaMaterias = () => {
    const dispatch = useDispatch();
    const { materiasDocente, materiasEspecialista } = useSelector(state => state.indicador.materias);

    const [modalOpen, setModalOpen] = useState(false);
    const allMaterias = [...materiasDocente, ...materiasEspecialista];


    const deleteMateria = async (id, materia) => {

        const isConfirmed = await alertDeleteItems(`Eliminar Materia: ${materia}`);
        if (isConfirmed) {
            await apiDeleteRegister(id, 'materias');
            dispatch(materiasExistentes());
            alertSuccess('La acción ha sido completada', 'center');
        }
    }

    return (
        <div className={style.contentMaterias}>
            {modalOpen && <ModalMaterias closeModal={setModalOpen} />}
            <div className={style.divButtonNewMateria}>
                <button type='button' className={style.buttonNewMateria} onClick={() => setModalOpen(true)}>
                    Crear Materia
                </button>
            </div>
            <table className={style.tableMaterias}>
                <thead className={style.tableMateriasThead} >
                    <tr className={style.tableMateriasTr}>
                        <th className={style.tableMateriasTh} >Materias</th>
                        <th className={style.tableMateriasTh} >Tipo</th>
                        <th className={style.tableMateriasTh} >Acción</th>
                    </tr>
                </thead>
                <tbody className={style.tableMateriasTbody}>
                    {
                        allMaterias.map(value => (
                            <tr className={`${style.tableMateriasTrBody} animate__animated animate__fadeIn`} key={value.id}>
                                <td className={style.tableMateriaschildrenBody}>{value.materia}</td>
                                <td className={style.tableMateriaschildrenBody}>{value.tipo}</td>
                                <td className={style.tableMateriaschildrenBody}>
                                    <button className={style.deleteMateria}
                                        onClick={() => deleteMateria(value.id, value.materia)} type='button' >
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
