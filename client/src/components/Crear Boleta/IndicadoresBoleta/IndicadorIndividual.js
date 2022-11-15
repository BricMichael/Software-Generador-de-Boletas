import { useState } from 'react';
import style from './indicadoresAreas.module.css';


export const IndicadorIndividual = ({ indicador, removerOrAgregarIndicador }) => {
  const [desmarcarIndicador, setDesmarcarIndicador] = useState(true);

  const handleDesmarcarIndicador = () => { // agregar o desmarcar indicador.    
    removerOrAgregarIndicador(desmarcarIndicador ? 'remover' : 'agregar', indicador.id);
    setDesmarcarIndicador(!desmarcarIndicador);
  }

    return (
        <div className={style.single_card} style={{background: desmarcarIndicador ? '#84c784' : '#7e3544'}} >
          <div className={style.top_card}>
            <b className={style.index_card}>#{indicador.id}</b>
            <div style={{ display: "flex" }}>
              <button
                className={`${style.btn_card} ${style.delete_btn}`}
                onClick={handleDesmarcarIndicador}
                style={{background: desmarcarIndicador ? '#9e1934' : '#0f0'}}
              >
                { desmarcarIndicador ? 'Desmarcar' : 'Agregar '}
              </button>
            </div>
          </div>
          <div className={style.description_card}>
            <p className={style.materia_card}>{indicador.area}:</p>
            <p className={style.indicador_card}>{indicador.indicador}</p>
          </div>
          <div className={style.footer_card}>
            <p className={style.momento_card}>
              {indicador.momento.slice(0,1).toUpperCase() + indicador.momento.slice(1)}
            </p>
            <p className={style.CE_card}>Nivel: {indicador.grado.slice(5)}</p>
            <p className={style.CE_card}>C.E: {indicador.condicion_especial}</p>
          </div>
      </div>
    )
}

export default IndicadorIndividual;
