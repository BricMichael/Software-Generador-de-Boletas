import BuscarEstudiantes from '../../../components/Crear Boleta/BuscarEstudiantes';
import CabeceraDatosAlumno from '../../../components/Crear Boleta/CabeceraDatosAlumno';
import IndicadoresAreas from '../../../components/Crear Boleta/IndicadoresAreas';
import { backgroundColorPage } from '../../../helpers/coloresBG';
import style from './crearBoleta.module.css'


const CrearBoleta = ({num = 1}) => {
    backgroundColorPage('#012c66');

    let indicadorLengua = `Identificó de manera acorde los signos de puntuación tales como: el punto, los dos puntos, la coma, las
    comillas, signos de interrogación, signos de admiración.
    Comprendió y estableció comparaciones entre la silaba tónica.`;

    let indicadorMatema = `Por medio de explicaciones utilizó el método apropiado, según sea el caso en divisiones de 
    números con decimales.`; 

    let experimento = `Por medio de explicaciones utilizó el método apropiado, según sea el caso en divisiones de 
    números con decimales`;

    return (
        <>
            <h1 className={ style.nooo }>Creación de boleta</h1>
            <div className={style.firstComponents}>
                <BuscarEstudiantes />
                <CabeceraDatosAlumno />
            </div>

           
            <div className={ style.display }>
                <h2>Indicadores</h2>
                <div className={ style.leyendaFlex }>
                    <h3 className={ style.leyendaTitulos }>Leyenda:</h3>
                    <p className={ style.leyendaTitulos }><b>E:</b> Exelente</p>
                    <p className={ style.leyendaTitulos }><b>B:</b> Bien</p>
                    <p className={ style.leyendaTitulos }><b>RN:</b> Requiere nivelaci&oacute;n</p>
                </div>
                <IndicadoresAreas area='Lengua y Literatura' indicador={indicadorLengua}/> 
                <IndicadoresAreas area='Matemática' indicador={indicadorMatema}/> 
                <IndicadoresAreas area='Experimento científico' indicador={experimento}/>      
            </div>
            
        </>
    )
}

export default CrearBoleta;
