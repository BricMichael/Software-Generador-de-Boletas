import style from './dowloandBoleta.module.css';



const FormBusqueda = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={style.searchBoleta}>
            <p className={style.formSearchBoleta__title}>Datos del estudiante</p>
            <form className={style.formSearchBoleta} onSubmit={handleSubmit} >
                <div>
                    <input type="text" placeholder='Cédula escolar' className={style.formSearchBoleta__inputs} />

                    <select className={`${style.formSearchBoleta__inputs} ${style.separation}`} >
                        <option value="Momento 1">Momento 1</option>
                        <option value="Momento 2">Momento 2</option>
                        <option value="Momento 3">Momento 3</option>
                    </select>
                    <input type="number" placeholder='Año escolar ejemplo 2021' min='2020' className={style.formSearchBoleta__inputs} />
                </div>
                <div className={style.contentBtnSubmit}>
                    <input value="Cargando..." type='submit' className={style.contentBtnSubmit__input} />
                </div>
            </form>
        </div>
    )
}

export default FormBusqueda;
