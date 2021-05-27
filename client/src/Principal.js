import CuerpoHome from "./components/CuerpoHome";
import Header from "./components/Header";
import { colorPrincipal } from "./helpers/coloresBG";


const Principal = () => {
    colorPrincipal();
    return (
        <div>
            <Header />
            <CuerpoHome/>
        </div>
    )
}

export default Principal;
