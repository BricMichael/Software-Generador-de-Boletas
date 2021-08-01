import style from './infoRegistros.module.css';

const InfoRegistros = () => {
    return (
        <div className={ style.menuInformativo }>
            <div className={ style.dataMenu }>
                <p>Usuarios registrados: <small>46</small></p>
            </div>
            <div className={ style.dataMenu }>
                <p>Docentes: <small>26</small></p>
            </div>
            <div className={ style.dataMenu }>
                <p>Especialistas: <small>11</small></p>
            </div>
            <div className={ style.dataMenu }>
                <p>Coordinadores: <small>6</small></p>
            </div>
            <div  className={ style.dataMenu }>
                <p>Admin: <small>4</small></p>
            </div>
        </div>
    );
}

export default InfoRegistros;
