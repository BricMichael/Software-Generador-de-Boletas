import style from './listaDocente.module.css'

const ListaIndicDocente = () => {
    return (
        <div className={ style.general }>
        <h1>Lista de Indicadores</h1>
        <table className="table mt-5 text-center">
            <thead>
            <tr>
                <th>ID</th>
                <th className={ style.indicador }>Indicador</th>
                <th>Área</th>
                <th>Literal</th>
                <th>Condicion Especial</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>HTML Tutorial
                    CSS Tutorial
                    JavaScript Tutorial
                    How To Tutorial
                    SQL Tutorial
                    Python Tutorial
                    W3.CSS Tutorial
                    Bootstrap Tutorial PHP Tutorial
                    Java Tutorial
                    C++ Tutorial
                    jQuery Tutorial
                </td>
                <td>Ingles</td>
                <td>MB</td>
                <td>SI</td>
                <td>Editar</td>
                <td>Eliminar</td>
            </tr>
            <tr>
            <td>2</td>
                <td>HTML Tutorial
                    CSS Tutorial
                    JavaScript Tutorial
                    How To Tutorial
                    SQL Tutorial
                    Python Tutorial
                    W3.CSS Tutorial
                    Bootstrap Tutorial
                    PHP Tutorial
                    Java Tutorial
                    C++ Tutorial
                    jQuery Tutorial
                </td>
                <td>Matematica</td>
                <td>MB</td>
                <td>NO</td>
                <td>Editar</td>
                <td>Eliminar</td>
            </tr>
            <tr>
                <td>3</td>
                <td>HTML Tutorial
                    CSS Tutorial
                    JavaScript Tutorial
                    How To Tutorial
                    SQL Tutorial
                    Python Tutorial
                    W3.CSS Tutorial
                    Bootstrap Tutorial
                    PHP Tutorial
                    Java Tutorial
                    C++ Tutorial
                    jQuery Tutorial
                </td>
                <td>Musica</td>
                <td>MB</td>
                <td>NO</td>
            </tr>
            <tr>
                <td>3</td>
                <td>HTML Tutorial
                    CSS Tutorial
                    JavaScript Tutorial
                    How To Tutorial
                    SQL Tutorial
                    Python Tutorial
                    W3.CSS Tutorial
                    Bootstrap Tutorial
                    PHP Tutorial
                    Java Tutorial
                    C++ Tutorial
                    jQuery Tutorial
                </td>
                <td>Musica</td>
                <td>MB</td>
                <td>NO</td>
            </tr>
            
            </tbody>
        </table>
            
        </div>
    )
}

export default ListaIndicDocente;
