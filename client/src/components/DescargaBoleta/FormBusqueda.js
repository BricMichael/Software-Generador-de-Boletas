import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../helpers/useForm';
import style from './dowloandBoleta.module.css';
import { getDataBoletaByStudent } from '../../Redux/actions/descargasBoletaActions';
import { gradoStudent } from '../../helpers/arraysOptionsForm'


const FormBusqueda = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [values, handleInputChange, reset] = useForm({ cedulaEscolar: '', momento: 'momento 1', anio_escolar: '', grado: 'nivel1' });


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(getDataBoletaByStudent(values, reset, setLoading));
    }

    return (
        <div className={style.searchBoleta}>
            <p className={style.formSearchBoleta__title}>Buscar Boleta Por Cédula Escolar</p>
            <form className={style.formSearchBoleta} onSubmit={handleSubmit} >
                <div>
                    <input
                        type="text"
                        placeholder='Cédula escolar'
                        name='cedulaEscolar'
                        value={values.cedulaEscolar}
                        onChange={handleInputChange}
                        autoComplete='off'
                        className={style.formSearchBoleta__inputs}
                    />

                    <select className={`${style.formSearchBoleta__inputs}`} name='momento' value={values.momento} onChange={handleInputChange} >
                        <option value="momento 1">Momento 1</option>
                        <option value="momento 2">Momento 2</option>
                        <option value="momento 3">Momento 3</option>
                    </select>
                    <input
                        type="text"
                        placeholder='Año escolar ejemplo: 2022-2023'
                        onChange={handleInputChange}
                        name='anio_escolar'
                        value={values.anio_escolar}
                        className={style.formSearchBoleta__inputs}
                    />
                    <select className={style.formSearchBoleta__inputs} name='grado' value={values.grado}
                        onChange={handleInputChange} >
                        {
                            gradoStudent.map(option => (
                                <option value={option.value} key={option.value}>{option.desc}</option>
                            ))
                        }
                    </select>                
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
