import style from '../../views/Sistema/Boletas/crearBoleta.module.css';



const CabeceraDatosAlumno = () => {
    return (
        <>
            <form className={ style.contentForm }>
                <div className={ style.group }>
                    <label>Estudiante</label>
                    <input placeholder="Nombre del estudiante" type="text" className={style.Cboleta_input} 
                    />
                </div>
                <div className={ style.group }>    
                    <label>Grado</label>
                    <input placeholder="Grado" type="text" className={style.Cboleta_input} 
                    />
                </div>  
                <div className={ style.group }>                   
                    <label>Secci&oacute;n</label>
                    <input placeholder="Sección" type="text" className={style.Cboleta_input} 
                    />
                </div>
                <div className={ style.group }>     
                    <label>Docente</label>
                    <input placeholder="Docente" type="text" className={style.Cboleta_input} 
                    />
                </div>
                <div className={ style.group }>     
                    <label>Ser y convivir</label>
                    <textarea placeholder="Descripción SER Y CONVIVIR..."></textarea>
                </div>    
            </form>
        </>
    )
}

export default CabeceraDatosAlumno;
