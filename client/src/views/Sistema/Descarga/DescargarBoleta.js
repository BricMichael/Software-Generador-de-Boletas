import { useDispatch } from "react-redux";
import BotonHome from "../../../components/BotonVolverYSubir/BotonHome";
import DatosBoletaStudent from "../../../components/DescargaBoleta/DatosBoletaStudent";
import FormBusqueda from "../../../components/DescargaBoleta/FormBusqueda";
import Header from "../../../components/Header/Header";
import { backgroundColorPage } from "../../../helpers/coloresBG";
import { limpiarDataBoleta } from "../../../Redux/actions/descargasBoletaActions";


const DescargarBoleta = () => {
    const dispatch = useDispatch();

    backgroundColorPage('#012c66');
    document.title = 'Zona descargar boleta';

    const resetState = () => dispatch(limpiarDataBoleta());

    return (
        <>
            <BotonHome resetState={resetState} />
            <Header title="Descargar boleta" marginTop='-4rem' />

            <FormBusqueda />
            <DatosBoletaStudent />
        </>
    )
}

export default DescargarBoleta;
