import style from './crearIndicador.module.css'

const CreaIndicadorDocente = () => {
    return (
        <div className={`${style.pag_total}`}>
            <form className={`${style.form}`}>
                <textarea className={`${style.textArea}`} placeholder="Escribe tu indicador"></textarea>
                <div className={`${style.all_selects}`}>
                    <select className={`${style.select}`}>
                        <option value="default">&Aacute;rea</option>
                        <option value="Leng&Liter">Lengua y Literatura</option>
                        <option value="Matematica">Matematica</option>
                    </select>
                    <select className={`${style.select}`}>
                        <option value="default">Condición Especial</option>
                        <option value="Leng&Liter">Si</option>
                        <option value="Matematica">No</option>
                    </select>
                
                    <button type="submit" className={`${style.button}`}>Guardar</button> 
                </div>  
            </form>
        </div>
    );
}

export default CreaIndicadorDocente;
