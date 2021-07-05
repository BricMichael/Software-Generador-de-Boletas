import style from './indicadoresAreas.module.css';
import Prueba from './Prueba';


const IndicadoresAreas = ({arrayIndicador, area ,num = 1}) => {

    return (
        <>
             <table className={style.tablaIndicadoresBoleta}>  
                <thead className={style.tHeadIndicadoresBoleta}>
                    <tr className={ style.a}>
                        <th>#</th>
                        <th>Área: {area}</th>
                        <th>E</th>
                        <th>B</th>
                        <th>RN</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrayIndicador.map( objeto => (
                            <Prueba key={objeto.area} />
                        ))
                   }       
                </tbody>
            </table>   
        </>
    )
}

export default IndicadoresAreas;


 