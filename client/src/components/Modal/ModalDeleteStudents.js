import { apiDeleteAllStudents, apiDeleteStudentsByGrado } from "../../api/api";
import Modal from "./Modal";
import style from './modalDeleteStudentes.module.css'
import { useEffect, useState } from 'react'
import { alertDeleteItems, alertSuccess } from "../../helpers/alerts";
import { solicitarAllStudents } from "../../Redux/actions/configuracionActions";


const ModalDeleteStudents = ({ closeModal }) => {
    const [totalByGrado, setTotalesByGrado] = useState({ totalStudents: 0, StudentsByGrado: [], loading: false })


    useEffect(() => {
        setTotalesByGrado({ totalStudents: 0, StudentsByGrado: [], loading: true });
        solicitarAllStudents(setTotalesByGrado);

        return () => {
            setTotalesByGrado({ totalStudents: 0, StudentsByGrado: [], loading: false });
        }
    }, [])

    const arrayTotalByGrado = [
        'Nivel 1:',
        'Nivel 2:',
        'Nivel 3:',
    ];

    const deleteByGrado = async (grado) => {
        let resp = await alertDeleteItems(`¿Eliminar todos los estudiantes de ${grado}? `);
        if (resp) {
            const { data } = await apiDeleteStudentsByGrado(grado);
            solicitarAllStudents(setTotalesByGrado);
            alertSuccess(data.message);
        }
    }

    const deleteAllRegisters = async () => {
        let resp = await alertDeleteItems(`¿Eliminar ${totalByGrado.totalStudents} registros?`);
        if (resp) {
            const { data } = await apiDeleteAllStudents();
            setTotalesByGrado({ totalStudents: 0, StudentsByGrado: [] });
            alertSuccess(data.message);
        }
    }

    return (
        <Modal closeModal={closeModal}>

            <div className={style.contentModalStudents}>
                { totalByGrado.StudentsByGrado.length === 0 && !totalByGrado.loading && <p>No hay estudiantes registrados.</p> }
                {  totalByGrado.loading && <p>Cargando...</p> }
                {
                   totalByGrado.StudentsByGrado.length > 0 &&
                    <>
                            <h4 className={style.ModalStudentsTitle}>Datos Estudiantes</h4>
                            <p className={style.ModalStudentsTotal}>Total de Estudiantes: <b>{totalByGrado.totalStudents}</b></p>
                            {
                                totalByGrado.StudentsByGrado.map(grado => (
                                    <div className={style.ModalStudentsInfo} key={grado.grado} >
                                        <span className={style.ModalStudentsSpan}>
                                            {arrayTotalByGrado[+grado.grado.slice(-1) - 1]} <b>({grado.total})</b> {+grado.total === 1 ? 'Estudiante' : 'Estudiantes'} 
                                        </span>
                                        <button
                                            className={style.ModalStudentsInfoButtons}
                                            type='submit'
                                            onClick={() => deleteByGrado(grado.grado)}
                                        >
                                            {`Eliminar todos (${grado.total})`}
                                        </button>
                                    </div>
                                ))
                            }

                            {
                                totalByGrado.totalStudents > 0 &&
                                <button type='submit' onClick={deleteAllRegisters}
                                    className={style.ModalStudentsButtonTotal}>
                                    Eliminar todos ({`${totalByGrado.totalStudents}`}) registros
                                </button>
                            }

                            <button type='button'
                                className={style.ModalStudentsButtonCancelar}
                                onClick={() => closeModal(false)}
                            >
                                Cancelar
                            </button>
                    </>
                }
            </div>
        </Modal>
    )
}

export default ModalDeleteStudents;
