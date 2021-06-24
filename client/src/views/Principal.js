import CuerpoHome from "../components/CuerpoHome/CuerpoHome";
import Header from "../components/Header/Header";
import { backgroundColorPage } from '../helpers/coloresBG'


const Principal = () => {
    backgroundColorPage('#012c66');

    return (
        <div>
            <Header/>
            <CuerpoHome/>
        </div>
    )
}

export default Principal;
