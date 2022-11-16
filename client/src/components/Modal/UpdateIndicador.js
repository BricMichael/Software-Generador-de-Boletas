import Modal from "./Modal";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import style from './UpdateIndicador.module.css';
import { useForm } from "../../helpers/useForm";
import { actualizarIndicadorBD, limpiarFormAlActualizar } from "../../Redux/actions/indicadoresActions";
import { roles } from "../../helpers/roles";



const UpdateIndicador = ({ closeModal }) => {
    const dispatch = useDispatch();
    const dataIndicador = useSelector(state => state.indicador.updateIndicador.dataIndicador);
    const { materiasDocente } = useSelector(state => state.indicador.materias);

    const userLogeado = JSON.parse(localStorage.getItem('userActive'));

    const [values, handleInputChange, reset] = useForm(dataIndicador);
    const { indicador, literal, area, condicion_especial, grado, momento } = values;

    useEffect(() => {
        return () => {
            reset();
        }
    }, [])


    const updateNewData = (e) => {
        e.preventDefault();
        dispatch(actualizarIndicadorBD(values));
        closeModal(false);
    }

    const cancelUpdate = () => {
        closeModal(false);
        dispatch(limpiarFormAlActualizar());
    }

    const recorrerArray = userLogeado.rol === roles.especialista ? [{id:1, materia: userLogeado.especialidad}] : materiasDocente;


    return (
        <Modal closeModal={closeModal}>
            <form className={style.formModal}>
                <h2 className={style.titleFormModal}>Actualizando Indicador</h2>
                <textarea
                    className={`${style.ModaltextArea} ${userLogeado.rol === roles.especialista && style.Height}`}
                    name="indicador"
                    value={indicador}
                    onChange={handleInputChange}
                    placeholder="Editando indicador">
                </textarea>

                <label className={style.labelInputs}>Área</label>
                <select className={`${style.Modalselect}`}
                    name='area'
                    value={area}
                    onChange={handleInputChange}
                >
                    {
                        recorrerArray.map(area => (
                            <option value={area.materia} key={area.materia}>{area.materia}</option>
                        ))
                    }
                </select>
                <label className={style.labelInputs}>Condición Especial</label>
                <select className={`${style.Modalselect}`} name="condicion_especial"
                    value={condicion_especial} onChange={handleInputChange}
                >
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                </select>

                <label className={style.labelInputs}>Momento</label>
                <select className={`${style.Modalselect}`} name="momento" value={momento}
                    onChange={handleInputChange}
                >
                    <option value="momento 1">Momento 1</option>
                    <option value="momento 2">Momento 2</option>
                    <option value="momento 3">Momento 3</option>
                </select>
                {
                    userLogeado.rol === roles.especialista &&
                    <>
                        <label className={style.labelInputs}>Grado</label>
                        <select className={`${style.Modalselect}`} name="grado" value={grado}
                            onChange={handleInputChange}
                        >
                            <option value="nivel1">Nivel 1</option>
                            <option value="nivel2">Nivel 2</option>
                            <option value="nivel3">Nivel 3</option> 
                        </select>

                        <label className={style.labelInputs}>Literal</label>
                        <select className={`${style.Modalselect}`} name="literal" value={literal}
                            onChange={handleInputChange}
                        >
                            <option value="muy bien">Muy bien</option>
                            <option value="bien">Bien</option>
                            <option value="en proceso">En proceso</option>
                            <option value="requiere nivelación">Requiere nivelación</option>
                        </select>
                    </>
                }

                <button type='submit' onClick={updateNewData}
                    className={style.formModalButtons}>
                    Actualizar
                </button>


                <button className={`${style.formModalButtons} ${style.buttonCancel}`}
                    onClick={cancelUpdate} type='button'>
                    Cancelar
                </button>
            </form>
        </Modal>
    )
}

export default UpdateIndicador;
