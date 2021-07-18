import style from '../../views/Sistema/Usuarios/registrosUsers.module.css'

const TableUsers = ({count = 1}) => {
    return (
        <table className={ style.registersTable}>  
            <thead className={ style.registersTableThead} >
                <tr className={ style.registersTableTr}>
                    <th className={ style.registersTh } ><b>#</b></th>
                    <th className={ style.registersTh } >Nombre</th>
                    <th className={ style.registersTh } >C&eacute;dula</th>
                    <th className={ style.registersTh } >Correo</th>
                    <th className={ style.registersTh } >&Aacute;rea</th>
                    <th className={ style.registersTh } >Grado</th>
                    <th className={ style.registersTh } >Rol</th>
                    <th className={ style.registersTh } >Acciones</th>
                </tr>
            </thead>
            <tbody className={ style.registersTbody }>    
                <tr className={`${style.registerTrBody} animate__animated animate__fadeIn`} >
                        <td className={style.childrenBody}><b>{ count++ }</b></td>
                        <td className={style.childrenBody}>Eduardo Torrealba</td>
                        <td className={ style.childrenBody }>2487564</td>
                        <td className={ style.childrenBody }>EduarJose23@gmail.com</td>
                        <td className={ style.childrenBody }>Matematica</td>
                        <td className={ style.childrenBody }>3</td>
                        <td className={ style.childrenBody }>Rol</td>
                        <td className={ style.childrenEdit}>
                            <button className={`${style.edit}  ${style.botones}`}>
                                Editar
                            </button> 
                            <button className={ `${style.delete}  ${style.botones}`}>
                                Eliminar
                            </button>  
                        </td>
                </tr>      
            </tbody>
        </table>
    )
}
export default TableUsers;