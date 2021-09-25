import CuerpoHome from "../components/CuerpoHome/CuerpoHome";
import Header from "../components/Header/Header";
import { backgroundColorPage } from '../helpers/coloresBG'


const Principal = () => {
    backgroundColorPage('#012c66');
    document.write = 'Generador de Boletas';

    return (
        <div>
            <Header />
            <CuerpoHome />
        </div>
    )
}

export default Principal;
