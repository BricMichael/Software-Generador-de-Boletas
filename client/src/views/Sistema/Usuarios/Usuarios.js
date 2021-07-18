import style from './registrosUsers.module.css';
import BotonHome from '../../../components/BotonVolverYSubir/BotonHome';
import Header from '../../../components/Header/Header';
import { backgroundColorPage } from '../../../helpers/coloresBG';
import EstudianteReg from '../../../components/Registros/EstudianteReg';
import PersonalReg from '../../../components/Registros/PersonalReg';
import TableUsers from '../../../components/Registros/TableUsers';
import Options from '../../../components/Options&Links/Options';



const Usuarios = () => {
    backgroundColorPage('#012c66'); 
    document.title = 'Registro de Usuarios';
    let doc= 'admin'
    return (
        <>
            <BotonHome />
            <Header title="Zona de registros"  marginTop='-4.4rem' />
            <div className={ style.registros }>
                <EstudianteReg />
                <Options cabecera='Buscar estudiante por cédula escolar' btnText='Buscar estudiante'/>
            </div>   
            {
                doc === 'admin' &&
                    <div className={ style.secondContent }>
                        <PersonalReg />
                        <div>
                            <h2 className={ style.titleH2 } >Usuarios registrados</h2>    
                            <TableUsers />
                        </div>
                    </div>
            }        
        </>
    )
}

export default Usuarios;
