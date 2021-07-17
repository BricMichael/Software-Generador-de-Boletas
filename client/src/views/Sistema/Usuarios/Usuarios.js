import style from './registrosUsers.module.css';
import BotonHome from '../../../components/BotonVolverYSubir/BotonHome';
import Header from '../../../components/Header/Header';
import { backgroundColorPage } from '../../../helpers/coloresBG';
import EstudianteReg from '../../../components/Registros/EstudianteReg';
import PersonalReg from '../../../components/Registros/PersonalReg';





const Usuarios = () => {
    backgroundColorPage('#012c66'); 
    document.title = 'Registro de Usuarios';
    
    return (
        <>
            <BotonHome />
            <Header title="Zona de registros"  marginTop='-4.4rem' />

            <EstudianteReg />
            <PersonalReg />
        </>
    )
}

export default Usuarios;
