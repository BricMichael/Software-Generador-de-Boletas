import { useEffect, useRef } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import style from './membrete.module.css';
import { useForm } from '../../../helpers/useForm';
import { textAreaAndFecha, guardarBoletaAction } from '../../../Redux/actions/boletaActions';
// import { useHistory } from 'react-router-dom';
import { alertAvisos } from '../../../helpers/alerts';



const StudentSelected = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    // const { id: id_creador, rol } = JSON.parse(localStorage.getItem('userActive'));

    const studentSelected = useSelector(state => state.boleta.studentSelected);
    const date = useSelector(state => state.boleta.descripAndDate);

    const [values, handleInputChange, reset] = useForm({ ...studentSelected, ...date })
    const { nombres, grado, seccion, docente, inicioMomento, finMomento, anioEscolar, momento } = values;

    const nombreUser = useRef(studentSelected.nombres);

    const handleSubmit = () => {
        if (!nombres) alertAvisos('Selecciona un estudiante para continuar');
        else {
            // if( rol === 'docente' ) return dispatch(guardarBoletaAction({...values, id_creador, rol}));

            // history.push('/menu-principal/creacion-de-boletas/indicadores-boleta');
            dispatch(textAreaAndFecha({    
                momento,            
                inicioMomento,
                finMomento,
                anioEscolar
            }));
        }
    }

    useEffect(() => {
        if (studentSelected.nombres !== nombreUser.current) {
            reset({ ...studentSelected, ...date });
            nombreUser.current = studentSelected.nombres;
        }
    }, [studentSelected, reset])
    

    useEffect(() => {
        if( finMomento ) handleSubmit();
    }, [ momento, finMomento ])
    
    return (
        <div className={style.child2}>
            <form className={style.contentForm} onSubmit={handleSubmit} >
                <div className={style.group}>
                    <label>Estudiante seleccionado</label>
                    <input placeholder="Nombre del estudiante" type="text" className={style.Cboleta_input} value={nombres} name="nombres" autoComplete='off' disabled={true}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={style.group}>
                    <label>Grado</label>
                    <input placeholder="Grado" type="text" name="grado" disabled={true}
                        className={style.Cboleta_input} value={grado === 'nivel1' ? 'Nivel 1' : grado === 'nivel2' ? 'Nivel 2' : 'Nivel 3'}
                        onChange={handleInputChange} autoComplete='off'
                    />
                </div>
                <div className={style.group}>
                    <label>Secci&oacute;n</label>
                    <input placeholder="Sección" type="text" name="seccion" disabled={true}
                        className={style.Cboleta_input} value={seccion}
                        onChange={handleInputChange} autoComplete='off'
                    />
                </div>
                <div className={style.group}>
                    <label>Docente</label>
                    <input placeholder="Docente" className={`${style.Cboleta_input} ${style.font_size}`}
                        type="text" value={docente} name='docente' disabled={true}
                        onChange={handleInputChange} autoComplete='off'
                    />
                </div>
                <div className={style.group}>
                    <label htmlFor='anio'>Año escolar</label>
                    <input
                        type='text'
                        placeholder='Ejemplo, 2022-2023, 2023-2024'
                        autoComplete='off'
                        name='anioEscolar'
                        value={anioEscolar}
                        onChange={handleInputChange}
                        id='anio'
                        className={style.Cboleta_input}
                    />
                </div>
                <div className={style.group}>
                    <label>Momento</label>
                    <select name='momento' value={momento} onChange={handleInputChange} style={{width: '100%', border: 'none', borderBottom: '1px solid #d8d8d8'}}>
                        <option value="momento 1">Momento 1</option>
                        <option value="momento 2">Momento 2</option>
                        <option value="momento 3">Momento 3</option>
                    </select>
                </div> 
                <div className={style.group}>
                    <label htmlFor='inicio'>Inicio del Momento escolar</label>
                    <input
                        type='text'
                        placeholder='Ejemplo: Enero'
                        autoComplete='off'
                        name='inicioMomento'
                        value={inicioMomento}
                        onChange={handleInputChange}
                        id='inicio'
                        className={style.Cboleta_input}
                    />
                </div>
                <div className={style.group}>
                    <label htmlFor='fin'>Fin del Momento escolar</label>
                    <input
                        type='text'
                        placeholder='Ejemplo: Marzo'
                        autoComplete='off'
                        name='finMomento'
                        value={finMomento}
                        onChange={handleInputChange}
                        id='fin'
                        className={style.Cboleta_input}
                    />
                </div>            
                {/* <button type='submit' className={style.linkToIndicadores}>
                    {   rol === 'docente' 
                            ? 'Registrar Boleta'
                            : 'Indicadores de la boleta &nbsp;<i className="fas fa-long-arrow-alt-right"></i>'
                    }
                </button> */}
            </form>
        </div>
    )
}

export default StudentSelected;
