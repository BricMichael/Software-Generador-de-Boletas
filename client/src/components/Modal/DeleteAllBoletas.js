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
            <div className="eliminarBoletas">
                <p>Eliminar todas las boletas</p>

                <div>
                    <label htmlFor="">Ingrese su contraseña para continuar</label>
                    <input
                        type="password"
                        required
                        autoComplete='off'
                        placeholder='*********'
                        name='claveAdmin'
                        value={password.claveAdmin}
                        onChange={({ target }) => setPassword({ claveAdmin: target.value })}
                    />

                    <button type='submit' onClick={methodDeleteBoletas}>Eliminar Boletas</button>
                    <button type='button' onClick={() => closeModal(false)}>Cancelar</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteAllBoletas;
