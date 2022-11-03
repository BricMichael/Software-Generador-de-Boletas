import { useState, useEffect, useRef } from 'react';
import style from './listIndicadores.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIndicador, indicadorActivo } from '../../Redux/actions/indicadoresActions';
import UpdateIndicador from '../../components/Modal/UpdateIndicador';
import { roles } from '../../helpers/roles';
import materiaConIndicadores from '../../helpers/creacionBoleta';
import { handleAreaSelected, validacionUseEffect } from '../../helpers/accionesListaIndicadores';


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

    const checkLengthData = indicadoresByUser.length > 0;

    useEffect(() => {
        if (checkLengthData) {
            const datos = materiaConIndicadores(materiasShowOptions, indicadoresByUser, 'Lista Indicadores');
            let result = datos.filter(item => item.indicadores.length >= 1);

            validacionUseEffect(momentoRef, nameUserRef, momentoState, nameUser, setHandleMaterias, result, indice);
        } else setHandleMaterias({ dataSelected: [], allData: [], indice: 0 });

        return () => {
            setHandleMaterias({ dataSelected: [], allData: [], indice: 0 });
        }

    }, [indicadoresByUser])

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
                    
            {
                rol !== roles.especialista && allData.length > 0 &&
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '.5rem'}}>
                    <p className={style.noResults} style={{marginRight: '1rem'}}>
                        { msgData.length > 4 ? msgData : 'Filtrar por área' }
                    </p>
                    <select className={style.showOptionsOfMaterias} onChange={handleDisplay}>
                        <option value={materiasShowOptions[0].materia}>Áreas</option>
                        {materiasShowOptions.map(value => (
                            <option key={value.materia} value={value.materia}>
                                {value.materia}
                            </option>
                        ))}
                    </select>
                </div>                       
            }


            {
                allData.length > 0 && 
                <div className={style.wrapper_cards}>
                    {
                        dataSelected?.map(card => (               
                            <div className={style.single_card} key={card.id}>
                                <div className={style.top_card}>
                                    <b className={style.index_card}>#{count++}</b>
                                    <div style={{display: 'flex'}}>
                                        <button className={style.btn_card} onClick={() => editIndicador(card)}>
                                            Editar
                                        </button>
                                        <button className={`${style.btn_card} ${style.delete_btn}`} onClick={() => eliminarIndicador(card.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                                <div className={style.description_card}>
                                    <p className={style.materia_card}>{card.area}:</p>
                                    <p className={style.indicador_card}>{card.indicador}</p>
                                </div>
                                <div className={style.footer_card}>
                                    <p className={style.momento_card}>{card.momento.slice(0,1).toUpperCase() + card.momento.slice(1)}</p>
                                    <p className={style.CE_card}>Nivel: {card.grado.slice(5)}</p>
                                    <p className={style.CE_card}>C.E: {card.condicion_especial}</p>
                                </div>
                            </div>                            
                        )) 
                    } 
                </div>                  
            }
        </>
    );
}

export default ListaIndicadores;
