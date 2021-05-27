// import Modal from "../../components/Modal";

import Header from "../../components/Header";
import CreaIndicadorDocente from "./CreaIndicadorDocente";
import ListaIndicDocente from "./ListaIndicDocente";

const colorBody = () => {
    let body = document.querySelector('body');
    let header = document.getElementById('idColRepublica');
    header.style.color = "#012c66"
    body.style.backgroundColor = "#fff"
}


const IndicadoresDocente = () => { 
    colorBody();

    return (
        <>
        <Header />
        <CreaIndicadorDocente />

        <ListaIndicDocente /> 
        {/* tiene un margin-top */}
        </>
    );
}

export default IndicadoresDocente;
