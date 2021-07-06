// import { useEffect } from 'react';
import style from './crearBoleta.module.css'
import { backgroundColorPage } from '../../../helpers/coloresBG';
import { useDispatch, useSelector } from 'react-redux';
import materiaConIndicadores from '../../../helpers/IndicaDocenteBoleta';
import BuscarEstudiantes from '../../../components/Crear Boleta/BuscarEstudiantes';
import CabeceraDatosAlumno from '../../../components/Crear Boleta/CabeceraDatosAlumno';
import IndicadoresAreas from '../../../components/Crear Boleta/IndicadoresAreas';
import IndicadoresEspecialista from '../../../components/Crear Boleta/IndicadoresEspecialista';





const CrearBoleta = () => {
    backgroundColorPage('#012c66');
    const dispatch = useDispatch();

    const { indicadoresByUser, materias } = useSelector(state => state.indicador);
    const { materiasDocente, materiasEspecialista } = materias;

    const arrayOfMateriasIndicadores = materiaConIndicadores(materiasDocente, indicadoresByUser);

  

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
               
                {
                    arrayOfMateriasIndicadores.map( materiaDB => (
                        <IndicadoresAreas allIndicadores={ materiaDB} area={materiaDB[0]} key={ materiaDB[0]}
                         />
                    ))
                } 
                



                {/* componentes de especialistas */}
                {/* <IndicadoresEspecialista area='Francés' /> */}
            </div>
            
        </>
    );
}

export default CrearBoleta;
