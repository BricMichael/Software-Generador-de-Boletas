import { useState } from "react";
import Modal from "./Modal";
import style from './deleteBoleta.module.css';
import { apiEliminarAllBoletas } from "../../api/api";
import { alertErrors, alertSuccess } from "../../helpers/alerts";



const DeleteAllBoletas = ({ closeModal }) => {
    const emailAdmin = JSON.parse(localStorage.getItem('userActive')).email;
    const [password, setPassword] = useState({ claveAdmin: '' });
    const [countErrors, setCountErrors] = useState(0);

    const methodDeleteBoletas = async () => {
        try {
            if (countErrors >= 1) {
                setCountErrors(0);
                closeModal(false);
            }
            const { data } = await apiEliminarAllBoletas({ emailAdmin, claveAdmin: password.claveAdmin });

            if (data.error) {
                alertErrors(data.error, '#012c66', 'Operación denegada');
                setCountErrors(prev => prev + 1);
            } else {
                alertSuccess(data.res, 'center');
                closeModal(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal closeModal={closeModal} >
            <div className={style.eliminarAllBoletas}>
                <p className={style.titleEliminarAllBoletas}>Eliminando todas las boletas</p>

                <div className={style.formGroupEliminarAllBoletas}>
                    <label htmlFor="">Ingrese su contraseña para continuar.</label>
                    <input
                        type="password"
                        required
                        autoComplete='off'
                        placeholder='Ingrese su contraseña..'
                        name='claveAdmin'
                        value={password.claveAdmin}
                        onChange={({ target }) => setPassword({ claveAdmin: target.value })}
                    />
                </div>
                <div className={style.buttons}>
                    <button type='submit' onClick={methodDeleteBoletas} className={style.btnBoletaDelete} style={{ color: '#fff', background: '#012c66' }} >
                        Eliminar todas las Boletas
                    </button>
                    <button type='button' onClick={() => closeModal(false)} className={style.btnBoletaDelete}>
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteAllBoletas;
