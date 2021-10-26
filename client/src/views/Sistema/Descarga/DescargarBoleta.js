import BotonHome from "../../../components/BotonVolverYSubir/BotonHome";
import FormBusqueda from "../../../components/DescargaBoleta/FormBusqueda";
import Header from "../../../components/Header/Header";
import { backgroundColorPage } from "../../../helpers/coloresBG";


const DescargarBoleta = () => {
    backgroundColorPage('#012c66');
    document.title = 'Zona descargar boleta';


    return (
        <>
            <BotonHome />
            <Header title="Descargar boleta" marginTop='-4rem' />

            <FormBusqueda />
        </>
    )
}

export default DescargarBoleta;
