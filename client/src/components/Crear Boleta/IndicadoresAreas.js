import style from '../../views/Sistema/Boletas/crearBoleta.module.css';

const IndicadoresAreas = ({area, indicador}) => {
    return (
        <>
            <div className={ style.zoneRight }>
                <h2>Indicadores</h2>
                <div className={ style.contentIndicadores }>
                    <div className={ style.cabeceraIndicadores }>
                        <h4 className={ style.materia }>Área: { area }</h4>
                        <h4>E</h4>
                        <h4>B</h4>
                        <h4>RN</h4>
                  
                        <div className={ style.descripIndicador } >
                            <p> {indicador}
                            </p>
                            </div>
                        <div className={ style.backColor } ><input name={area} type="radio" value="E"  className={ style.checkbox} /></div>
                        <div className={ style.backColor } ><input  name={area} type="radio" value="B"  className={ style.checkbox} /></div>
                        <div className={ style.backColor } ><input  name={area} type="radio" value="RN"  className={ style.checkbox} /></div>                
                     </div>
                </div>
            </div>    
        </>
    )
}

export default IndicadoresAreas;
