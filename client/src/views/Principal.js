import CuerpoHome from "../components/CuerpoHome/CuerpoHome";
import Header from "../components/Header/Header";
import { colorPrincipal } from '../helpers/coloresBG'


const Principal = () => {
    colorPrincipal();
    return (
        <div>
            <Header/>
            <CuerpoHome/>
        </div>
    )
}

export default Principal;
