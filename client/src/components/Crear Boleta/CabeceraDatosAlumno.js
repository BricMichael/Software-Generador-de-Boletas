import { useEffect, useRef } from 'react';
import style from '../../views/Sistema/Boletas/crearBoleta.module.css';
import { useSelector, } from 'react-redux';
import { useForm } from '../../helpers/useForm';


const CabeceraDatosAlumno = () => {
    const { studentSelected } = useSelector( state => state.boleta );

    const [ values, handleInputChange, reset ] = useForm(studentSelected)
    const {nombres, grado, seccion, textArea, docente} = values;

    const nombreUser = useRef( studentSelected.nombres );

    useEffect(() => {
        if ( studentSelected.nombres !== nombreUser.current ){
            reset(studentSelected);
            nombreUser.current = studentSelected.nombres;
        }
    }, [studentSelected, reset])

    return (
        <>
            <form className={ style.contentForm }>
                <div className={ style.group }>
                    <label>Estudiante</label>
                    <input placeholder="Nombre del estudiante" type="text" className={style.Cboleta_input} value={ nombres } name="nombres"
                    onChange={handleInputChange}
                    />
                </div>
                <div className={ style.group }>    
                    <label>Grado</label>
                    <input placeholder="Grado" type="text" name="grado"
                    className={style.Cboleta_input} value={grado}
                    onChange={handleInputChange}
                    />
                </div>  
                <div className={ style.group }>                   
                    <label>Secci&oacute;n</label>
                    <input placeholder="Sección" type="text" name="seccion"
                    className={style.Cboleta_input}  value={ seccion }
                    onChange={handleInputChange}
                    />
                </div>
                <div className={ style.group }>     
                    <label>Docente</label>
                    <input placeholder="Docente"  className={style.Cboleta_input} 
                      type="text" value={ docente } name='docente' 
                      onChange={handleInputChange}
                    />
                </div>
                <div className={ style.group }>     
                    <label>Ser y convivir</label>
                    <textarea placeholder="Descripción SER Y CONVIVIR..."
                    value={textArea} name="textArea" onChange={handleInputChange}
                    ></textarea>
                </div>    
            </form>
        </>
    )
}

export default CabeceraDatosAlumno;
