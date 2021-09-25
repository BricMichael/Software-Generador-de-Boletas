import { useEffect, useRef } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import FechasBoleta from './FechasBoleta';
import style from './membrete.module.css';
import { useForm } from '../../../helpers/useForm';
import { parrafoTextArea } from '../../../Redux/actions/boletaActions';




const StudentSelected = () => {
    const dispatch = useDispatch();
    const studentSelected = useSelector( state => state.boleta.studentSelected );

    const [ values, handleInputChange, reset ] = useForm({ ...studentSelected, textArea: '' })
    const {nombres, grado, seccion, textArea, docente} = values;

    const nombreUser = useRef( studentSelected.nombres );

    useEffect(() => {
        if ( studentSelected.nombres !== nombreUser.current ){
            reset({ ...studentSelected, textArea: '' });
            nombreUser.current = studentSelected.nombres;
        }
    }, [studentSelected, reset])


    useEffect( () => {   
        dispatch( parrafoTextArea(textArea) );  
    }, [textArea ,dispatch])

    return (
        <div className={style.parte2}>
            <form className={ style.contentForm } >
                <div className={ style.group }>
                    <label>Estudiante seleccionado</label>
                    <input placeholder="Nombre del estudiante" type="text" className={style.Cboleta_input} value={ nombres } name="nombres" autoComplete='off' disabled={true}
                    onChange={handleInputChange}
                    />
                </div>
                <div className={ style.group }>    
                    <label>Grado</label>
                    <input placeholder="Grado" type="text" name="grado" disabled={true}
                    className={style.Cboleta_input} value={grado}
                    onChange={handleInputChange} autoComplete='off'
                    />
                </div>  
                <div className={ style.group }>                   
                    <label>Secci&oacute;n</label>
                    <input placeholder="Sección" type="text" name="seccion" disabled={true}
                    className={style.Cboleta_input}  value={ seccion }
                    onChange={handleInputChange} autoComplete='off'
                    />
                </div>
                <div className={ style.group }>     
                    <label>Docente</label>
                    <input placeholder="Docente"  className={`${style.Cboleta_input} ${style.font_size}`}
                      type="text" value={ docente } name='docente'  disabled={true}
                      onChange={handleInputChange} autoComplete='off'
                    />
                </div>
                <div className={ style.group }>     
                    <label>Ser y convivir</label>
                    <textarea placeholder="Descripción SER Y CONVIVIR..."
                    value={textArea} name="textArea" onChange={handleInputChange}
                    ></textarea>
                </div>    
            </form>

            <FechasBoleta />
        </div>
    )
}

export default StudentSelected;
