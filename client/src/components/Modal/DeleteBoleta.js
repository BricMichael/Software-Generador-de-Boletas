import { useForm } from "../../helpers/useForm";
import Modal from "./Modal";
import style from './deleteBoleta.module.css';
import { apiEliminarBoleta } from "../../api/api";
import { alertAvisos, alertSuccess } from "../../helpers/alerts";


const DeleteBoleta = ({ closeModal }) => {

    const [values, handleInputChange, reset] = useForm({ cedulaEscolar: '', momento: 'Momento 1', anio_escolar: '' });
    const { cedulaEscolar, momento, anio_escolar } = values;


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cedulaEscolar || !anio_escolar) {
            alertAvisos('¡Uno o más campos están sin completar!');
        } else {
            const character = anio_escolar.indexOf('-');
            let convertAnio_escolar = '';
            if (character === -1) { // asegurarme de que el año escolar fue escrito con guión (-) y no con barra (/).
                convertAnio_escolar = `${anio_escolar.slice(0, 4)}-${anio_escolar.slice(5, 9)}`; // conver to 2021-2022
            }

            const { data } = await apiEliminarBoleta({
                ...values,
                anio_escolar: convertAnio_escolar ? convertAnio_escolar : anio_escolar
            });
            reset();
            alertSuccess(data.msg, 'center');
        }
    }

    return (
        <Modal closeModal={closeModal}>
            <form className={style.formDeleteBoleta} onSubmit={handleSubmit} >
                <p className={style.titleDeleteBoleta}>Eliminando Boleta</p>

                <div className={style.deleteBoleta_groupForm}>
                    <label htmlFor='cedulaEscolar'>Cédula escolar</label>
                    <input
                        type="text"
                        name='cedulaEscolar'
                        value={cedulaEscolar}
                        id='cedulaEscolar'
                        onChange={handleInputChange}
                        placeholder='Cédula del estudiante'
                    />
                </div>
                <div className={style.deleteBoleta_groupForm}>
                    <label htmlFor="momento">Momento</label>
                    <select name="momento" id="momento" value={momento} onChange={handleInputChange}>
                        <option value="Momento 1">Momento 1</option>
                        <option value="Momento 2">Momento 2</option>
                        <option value="Momento 3">Momento 3</option>
                    </select>
                </div>
                <div className={style.deleteBoleta_groupForm}>
                    <label htmlFor="anio_escolar">Año escolar</label>
                    <input
                        type="text"
                        id='anio_escolar'
                        name='anio_escolar'
                        value={anio_escolar}
                        onChange={handleInputChange}
                        placeholder='Ejemplo: 2021-2022, 2022-2023'
                    />
                </div>

                <div className={style.buttons}>
                    <button className={`${style.btnBoletaDelete} ${style.success}`} type='submit'>Borrar Boleta</button>
                    <button type='button' className={style.btnBoletaDelete} onClick={() => closeModal(false)}>Cancelar</button>
                </div>
            </form>
        </Modal>
    )
}

export default DeleteBoleta;
