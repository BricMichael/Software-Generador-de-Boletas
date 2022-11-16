import style from './indicadoresAreas.module.css';
import IndicadorIndividual from './IndicadorIndividual'


const IndicadoresAreas = ({ indicadoresByPersonal, removerOrAgregarIndicador, boletasGeneradas }) => {

    return (
      <div className={style.indicadoresByArea}>
        {
            indicadoresByPersonal.map((indicador) => 
                { if(indicador.indicador){
                      return <IndicadorIndividual 
                      indicador={indicador} 
                      removerOrAgregarIndicador={removerOrAgregarIndicador} 
                      boletasGeneradas={boletasGeneradas}
                      key={indicador.id} 
                    />
                  }                  
                }
            )
        }
      </div>
    );
}

export default IndicadoresAreas;
