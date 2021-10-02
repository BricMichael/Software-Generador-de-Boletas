import { useState, useEffect, useRef } from 'react';
import style from './listIndicadores.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIndicador, indicadorActivo } from '../../Redux/actions/indicadoresActions';
import UpdateIndicador from '../../components/Modal/UpdateIndicador';
import { roles } from '../../helpers/roles';
import materiaConIndicadores from '../../helpers/IndicaDocenteBoleta';

const ListaIndicadores = ({ count = 1, userSelected: { rolUserSelected, nameUser } }) => {
    const dispatch = useDispatch();
    const indicadoresByUser = useSelector(state => state.indicador.indicadoresByUser);
    const momentoState = useSelector(state => state.indicador.momento);
    const { materiasDocente, materiasEspecialista } = useSelector(state => state.indicador.materias);

    const [handleOpenModal, setHandleOpenModal] = useState(false);
    const [handleMaterias, setHandleMaterias] = useState({ dataSelected: [], allData: [], indice: 0 });
    const [msgData, setMsgData] = useState('');

    const { allData, indice, dataSelected } = handleMaterias;
    const { rol } = JSON.parse(localStorage.getItem('userActive'));
    const materiasShowOptions = (rolUserSelected === roles.especialista || rol === roles.especialista)
        ? materiasEspecialista
        : materiasDocente


    const momentoRef = useRef(momentoState);
    const nameUserRef = useRef(nameUser);



    useEffect(() => {
        const datos = materiaConIndicadores(materiasShowOptions, indicadoresByUser, 'Lista Indicadores');
        let result = datos.filter(item => item.indicadores.length >= 1);

        const checkMomento = momentoRef.current === momentoState;
        const checkNameUser = nameUser === nameUserRef.current;

        if (!checkMomento && result.length >= 1) {
            setHandleMaterias({// esta sirve para docentes, espcecialistas y coordinador
                allData: result,
                dataSelected: result[0]?.indicadores,
                indice: 1
            })
            momentoRef.current = momentoState;
            nameUserRef.current = nameUser;
        }
        else if (checkMomento && !checkNameUser) { // coordinador, el alumno es diferente mostrar la posicion 0 del nuevo lapso, para lo que seleccione el coordinador
            setHandleMaterias({
                allData: result,
                dataSelected: result[0]?.indicadores,
                indice: 1
            })
            nameUserRef.current = nameUser;
        }
        else if (checkMomento && checkNameUser && result.length >= 1) { //quedarse en la misma area donde hayan habido modificaciones.
            setHandleMaterias({
                allData: result,
                dataSelected: result[indice === 0 ? 0 : indice === 1 ? 1 : indice - 1]?.indicadores,
                indice: indice === 0 ? 0 : indice
            })

        }

    }, [indicadoresByUser])


    const editIndicador = (dataUpdate) => {
        setHandleOpenModal(true);
        delete dataUpdate.id_creador;
        delete dataUpdate.fecha_creacion;
        dispatch(indicadorActivo(dataUpdate));
    }

    const handleDisplay = ({ target: { value } }) => {
        const areaFiltrada = allData.find(type => type.area === value);

        if (!areaFiltrada) {
            setHandleMaterias({ ...handleMaterias, dataSelected: [] });
            setMsgData('No se han encontrado indicadores en el área: ' + value);

            setTimeout(() => {
                setMsgData('');
            }, 3100);
        } else {
            const indiceMateria = materiasShowOptions.map(item => item.materia).indexOf(value);
            const dataSelected = areaFiltrada.indicadores;
            setHandleMaterias({ ...handleMaterias, dataSelected, indice: indiceMateria + 1 });
        }
    }

    const nextBtn = () => {
        let check = allData[indice === 0 ? 1 : indice];

        setHandleMaterias({
            ...handleMaterias,
            dataSelected: check?.indicadores,
            indice: indice === 0 ? 2 : indice + 1
        })
    }

    const backBtn = () => {
        setHandleMaterias({
            ...handleMaterias,
            dataSelected: allData[indice <= 1 ? 0 : indice - 2].indicadores,
            indice: indice <= 2 ? 0 : indice - 1
        })
    }

    const eliminarIndicador = (id) => dispatch(deleteIndicador(id));

    const comprobacion = indicadoresByUser.length !== 0;

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
                                <th className={style.th2}>Acciones</th>
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

                    {dataSelected.length >= 1 &&
                        <div>
                            <button
                                type='button'
                                onClick={nextBtn}
                                disabled={indice >= allData.length ? true : false}
                            >
                                Siguiente area:
                                {
                                    indice >= allData.length
                                        ? ''
                                        : allData[indice].area
                                }
                            </button>
                            {allData[indice <= 1 ? 0 : indice - 2]?.area &&
                                <button type='button' onClick={backBtn} style={{ display: indice <= 1 && 'none' }} >
                                    Area anterior:
                                    {
                                        indice <= 2
                                            ? allData[0]?.area
                                            : allData[indice - 2]?.area
                                    }
                                </button>
                            }

                        </div>
                    }

                    <select className={style.showOptionsOfMaterias} onChange={handleDisplay}>
                        <option value={materiasShowOptions[0].materia}>Áreas</option>
                        {materiasShowOptions.map(value => (
                            <option key={value.materia} value={value.materia}>{value.materia}</option>
                        ))}
                    </select>
                </div>
            }
            {msgData.length > 4 && <p className={style.noResults} >{msgData}</p>}
        </>
    );
}

export default ListaIndicadores;
