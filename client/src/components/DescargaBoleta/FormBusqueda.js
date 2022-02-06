import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../helpers/useForm';
import style from './dowloandBoleta.module.css';
import { getDataBoletaByStudent } from '../../Redux/actions/descargasBoletaActions';


const FormBusqueda = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [values, handleInputChange, reset] = useForm({ fullName: '', momento: 'Momento 1', anioEscolar: '' });


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(getDataBoletaByStudent(values, reset, setLoading));
    }

    return (
        <div className={style.searchBoleta}>
            <p className={style.formSearchBoleta__title}>Datos del estudiante</p>
            <form className={style.formSearchBoleta} onSubmit={handleSubmit} >
                <div>
                    <input
                        type="text"
                        placeholder='Nombre completo'
                        name='fullName'
                        value={values.fullName}
                        onChange={handleInputChange}
                        autoComplete='off'
                        className={style.formSearchBoleta__inputs}
                    />

                    <select className={`${style.formSearchBoleta__inputs} ${style.separation}`} name='momento' value={values.momento} onChange={handleInputChange} >
                        <option value="Momento 1">Momento 1</option>
                        <option value="Momento 2">Momento 2</option>
                        <option value="Momento 3">Momento 3</option>
                    </select>
                    <input
                        type="number"
                        placeholder='Año escolar ejemplo, 2022'
                        onChange={handleInputChange}
                        name='anioEscolar'
                        value={values.anioEscolar}
                        min='2021'
                        className={style.formSearchBoleta__inputs}
                    />
                </div>
                <div className={style.contentBtnSubmit}>
                    <input
                        value={loading ? 'Cargando...' : 'Buscar'}
                        type='submit'
                        className={style.contentBtnSubmit__input}
                    />
                </div>
            </form>
        </div>
    )
}

export default FormBusqueda;
