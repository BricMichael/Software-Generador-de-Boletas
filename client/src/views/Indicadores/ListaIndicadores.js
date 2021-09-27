import { useState, useEffect } from 'react';
import style from './listIndicadores.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIndicador, indicadorActivo } from '../../Redux/actions/indicadoresActions';
import UpdateIndicador from '../../components/Modal/UpdateIndicador';
import { roles } from '../../helpers/roles';
import materiaConIndicadores from '../../helpers/IndicaDocenteBoleta';

const ListaIndicadores = ({ count = 1 }) => {
    const dispatch = useDispatch();
    const indicadoresByUser = useSelector(state => state.indicador.indicadoresByUser);
    const { materiasDocente, materiasEspecialista } = useSelector(state => state.indicador.materias);

    const [handleOpenModal, setHandleOpenModal] = useState(false);
    const [handleMaterias, setHandleMaterias] = useState({ dataSelected: [], allData: [], indice: 1 });
    const [msgData, setMsgData] = useState('');

    const { rol } = JSON.parse(localStorage.getItem('userActive'));
    const materiasShowOptions = rol === roles.especialista ? materiasEspecialista : materiasDocente;
    const { allData, indice } = handleMaterias;

    useEffect(() => {
        handleMaterias.length !== 0 && setHandleMaterias([]);
        const datos = materiaConIndicadores(materiasShowOptions, indicadoresByUser, 'Lista Indicadores');
        setHandleMaterias({ dataSelected: datos[0].indicadores, allData: datos, indice: 1 })

    }, [indicadoresByUser])

    const editIndicador = (dataUpdate) => {
        setHandleOpenModal(true);
        delete dataUpdate.id_creador;
        delete dataUpdate.fecha_creacion;
        dispatch(indicadorActivo(dataUpdate));
    }
    const handleDisplay = ({ target: { value } }) => {
        const areaFiltrada = allData.filter(type => type.area === value);
        const dataSelected = areaFiltrada[0].indicadores;
        const indiceMateria = materiasShowOptions.map(item => item.materia).indexOf(value)

        setHandleMaterias({ ...handleMaterias, dataSelected, indice: indiceMateria + 1 });

        if (dataSelected.length === 0) {
            setMsgData('No se han encontrado resultados en el área: ' + areaFiltrada[0].area);

            setTimeout(() => {
                setMsgData('');
            }, 3400);
        }
    }

    const eliminarIndicador = (id) => dispatch(deleteIndicador(id));


    const next = () => {
        console.log('next area')
        setHandleMaterias({
            ...handleMaterias,
            dataSelected: allData[indice === 0 ? 1 : indice].indicadores,
            indice: indice === 0 ? 2 : indice + 1
        })

    }
    const back = () => {
        console.log('back area')
        setHandleMaterias({
            ...handleMaterias,
            dataSelected: allData[indice <= 1 ? 0 : indice - 2].indicadores,
            indice: indice <= 2 ? 0 : indice - 1
        })
    }
    indice >= (allData.length - 1) ? console.log(true) : console.log(false)
    return (
        <>
            {handleOpenModal && <UpdateIndicador closeModal={setHandleOpenModal} />}
            <div className={style.solucion}>
                {indicadoresByUser.length !== 0 &&
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
                                handleMaterias.dataSelected.map(item => (
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
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                }
                {
                    (indicadoresByUser.length !== 0 && handleMaterias.dataSelected.length !== 0) &&
                    <div>

                        <button type='button' onClick={next} disabled={indice >= allData.length ? true : false}>
                            Siguiente area:
                            {
                                indice <= 1
                                    ? allData[1].area
                                    : indice >= allData.length
                                        ? ''
                                        : allData[indice].area
                            }

                        </button>
                        <button type='button' onClick={back} style={{ display: indice <= 1 && 'none' }} >
                            Area anterior:
                            {
                                indice <= 2
                                    ? allData[0].area
                                    : allData[indice - 2].area
                            }

                        </button>
                    </div>
                }
                {
                    indicadoresByUser.length !== 0 &&
                    <select className={style.showOptionsOfMaterias} onChange={handleDisplay}>
                        <option value={materiasShowOptions[0].materia}>Áreas</option>
                        {materiasShowOptions.map(value => (
                            <option key={value.materia} value={value.materia}>{value.materia}</option>
                        ))}
                    </select>
                }
            </div>
            <p className={style.noResults} >{msgData}</p>
        </>
    );
}

export default ListaIndicadores;
