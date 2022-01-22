import { useState, useEffect, useRef } from 'react';
import style from './listIndicadores.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIndicador, indicadorActivo } from '../../Redux/actions/indicadoresActions';
import UpdateIndicador from '../../components/Modal/UpdateIndicador';
import { roles } from '../../helpers/roles';
import materiaConIndicadores from '../../helpers/creacionBoleta';
import { backBtn, handleAreaSelected, nextBtn, validacionUseEffect } from '../../helpers/accionesListaIndicadores';


const ListaIndicadores = ({ count = 1, userSelected: { rolUserSelected, nameUser } }) => { //userSelected por coordinador.
    const dispatch = useDispatch();

    const indicadoresByUser = useSelector(state => state.indicador.indicadoresByUser);
    const momentoState = useSelector(state => state.indicador.momento);
    const { materiasDocente, materiasEspecialista } = useSelector(state => state.indicador.materias);

    const [handleOpenModal, setHandleOpenModal] = useState(false);
    const [msgData, setMsgData] = useState(''); // mensaje de aviso, cuando un área no tiene indicadores.
    const [handleMaterias, setHandleMaterias] = useState({ dataSelected: [], allData: [], indice: 0 });

    const { allData, indice, dataSelected } = handleMaterias;
    const { rol } = JSON.parse(localStorage.getItem('userActive'));
    const materiasShowOptions = (rolUserSelected === roles.especialista || rol === roles.especialista)
        ? materiasEspecialista
        : materiasDocente

    const momentoRef = useRef(momentoState);
    const nameUserRef = useRef(nameUser);

    const comprobacion = indicadoresByUser.length !== 0;

    useEffect(() => {
        if (comprobacion) {
            const datos = materiaConIndicadores(materiasShowOptions, indicadoresByUser, 'Lista Indicadores');
            let result = datos.filter(item => item.indicadores.length >= 1);

            validacionUseEffect(momentoRef, nameUserRef, momentoState, nameUser, setHandleMaterias, result, indice);
        } else setHandleMaterias({ dataSelected: [], allData: [], indice: 0 });

        return () => {
            setHandleMaterias({ dataSelected: [], allData: [], indice: 0 });
        }

    }, [indicadoresByUser])


    const siguienteArea = () => nextBtn(handleMaterias, setHandleMaterias);

    const areaAnterior = () => backBtn(handleMaterias, setHandleMaterias);

    const handleDisplay = ({ target }) => handleAreaSelected(target, allData, materiasShowOptions, handleMaterias, setHandleMaterias, setMsgData);

    const editIndicador = (dataUpdate) => {
        delete dataUpdate.id_creador;
        delete dataUpdate.fecha_creacion;
        dispatch(indicadorActivo(dataUpdate));
        setHandleOpenModal(true);
    }

    const eliminarIndicador = (id) => dispatch(deleteIndicador(id));

    return (
        <>
            {handleOpenModal && <UpdateIndicador closeModal={setHandleOpenModal} />}

            {comprobacion &&
                <div className={style.solucion}>

                    <table id={style.tablaViewIndicadores}>
                        <thead id={style.headTablaIndicadores}>
                            <tr className={style.cabeceraTitles}>
                                <th className={style.th2}>#</th>
                                <th className={style.th2}>Indicador</th>
                                <th className={style.th2}>&Aacute;rea</th>
                                <th className={style.th2}>Momento</th>
                                <th className={style.th2}>C.E</th>
                                {rol === roles.especialista &&
                                    <>
                                        <th className={style.th2}>Literal</th>
                                        <th className={style.th2}>Grado</th>
                                    </>
                                }
                                {rol !== roles.coordinador && <th className={style.th2}>Acciones</th>}
                            </tr>
                        </thead>
                        <tbody className={style.indicadorBody}>
                            {
                                dataSelected?.map(item => (
                                    <tr className={`${style.indIndividual} animate__animated animate__fadeIn`} key={item.id}>
                                        <th className={style.padding}>#{count++}</th>
                                        <th className={style.padding}>{item.indicador}</th>
                                        <th className={style.padding}>{item.area}</th>
                                        <th className={style.padding}>{item.momento}</th>
                                        <th className={style.padding}>{item.condicion_especial}</th>
                                        {
                                            rol === roles.especialista &&
                                            <>
                                                <th className={style.padding}>{item.literal}</th>
                                                <th className={style.padding}>{item.grado}</th>
                                            </>
                                        }
                                        {
                                            rol !== roles.coordinador &&
                                            <th className={`${style.padding} ${style.thContentButtons}`}>
                                                <button className={`${style.botones_indicadores} ${style.edit}`}
                                                    onClick={() => editIndicador(item)} >
                                                    Editar
                                                </button>
                                                <button className={`${style.botones_indicadores} ${style.delete}`}
                                                    onClick={() => eliminarIndicador(item.id)} >
                                                    Eliminar
                                                </button>
                                            </th>
                                        }
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>

                    {dataSelected.length >= 1 && rol !== roles.especialista &&
                        <div className={style.wrapperButtons}>
                            {allData[indice <= 1 ? 0 : indice - 2]?.area &&
                                <button
                                    type='button'
                                    className={style.nextBackButtons}
                                    onClick={areaAnterior}
                                    style={{ display: indice <= 1 && 'none' }}
                                >
                                    Area anterior: &nbsp;
                                    {
                                        indice <= 2
                                            ? allData[0]?.area
                                            : allData[indice - 2]?.area
                                    }
                                </button>
                            }
                            <button
                                type='button'
                                onClick={siguienteArea}
                                style={{ display: indice >= allData.length && 'none' }}
                                className={style.nextBackButtons}
                            >
                                Siguiente area: &nbsp;
                                {
                                    indice >= allData.length
                                        ? ''
                                        : allData[indice].area
                                }
                            </button>
                        </div>
                    }

                    {
                        rol !== roles.especialista &&
                        <select className={style.showOptionsOfMaterias} onChange={handleDisplay}>
                            <option value={materiasShowOptions[0].materia}>Áreas</option>
                            {materiasShowOptions.map(value => (
                                <option key={value.materia} value={value.materia}>{value.materia}</option>
                            ))}
                        </select>
                    }
                </div>
            }
            {msgData.length > 4 && <p className={style.noResults} >{msgData}</p>}
        </>
    );
}

export default ListaIndicadores;
