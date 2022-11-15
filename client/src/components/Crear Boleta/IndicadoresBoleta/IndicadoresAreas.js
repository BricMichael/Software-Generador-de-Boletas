// import { useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { literalesByAreaDocente } from '../../../Redux/actions/boletaActions';
import style from './indicadoresAreas.module.css';
import IndicadorIndividual from './IndicadorIndividual'



const IndicadoresAreas = ({ indicadoresByPersonal, removerOrAgregarIndicador, num = 1 }) => {
    // const dispatch = useDispatch();
    // el ultimo indicador dispara el dispatch con todos los con los literales agregados.
    // const lastIndicador = useRef(indicadores[indicadores.length - 1].id);


    // const literalSeleccionado = (id, { target }) => {
    //     const dataUpdated = indicadores.map(item => item.id === id ? { ...item, literal: target.value } : item);
    //     lastIndicador.current === id && dispatch(literalesByAreaDocente({ area, indicadores: dataUpdated }));
    //     setIndicadores(dataUpdated);

    // }

    return (
      <div className={style.indicadoresByArea}>
        {
            indicadoresByPersonal.map((indicador) => (
                <IndicadorIndividual 
                  indicador={indicador} 
                  removerOrAgregarIndicador={removerOrAgregarIndicador} 
                  key={indicador.id} 
                />
            ))
        }
      </div>
    );
}

export default IndicadoresAreas;
