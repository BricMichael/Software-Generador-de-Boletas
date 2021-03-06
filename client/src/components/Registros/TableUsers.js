import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { allUsuarios, eliminaRegistroAction, siguientes_AnterioresUsuarios } from '../../Redux/actions/usuariosActions';
import style from '../../views/Sistema/Usuarios/registrosUsers.module.css'
import InfoRegistros from '../InfoDataRegistros/InfoRegistros';
import UpdatePersonal from '../Modal/UpdatePersonal';




const TableUsers = ({indice = 1, countName = 0 }) => {
    const [handleOpenModal, setHandleOpenModal] = useState({ status: false, userSelected: {} });
    const [usersRegistrados, setUsersRegistrados] = useState({ datos: [], nombres: [] })
    
    useEffect(() => {
      let ejectuar =  async() => {
          const [ data, names ] = await allUsuarios()
          setUsersRegistrados({ datos: data, nombres: names });
      }
      ejectuar();
    
      return () => {
        setUsersRegistrados({ datos: [], nombres: [] });  
    }      
    }, [])

    const deleteUser = async( user ) => {   
   
        const { isConfirmed } = await Swal.fire({
            title: '¿Eliminar usuario?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar',
            width: '400px'
         })

        isConfirmed && eliminaRegistroAction( user, usersRegistrados, setUsersRegistrados );
    }

    const botonVerMas  = async() => {
        let [ data, names ] = await siguientes_AnterioresUsuarios('next');
         setUsersRegistrados({ datos: data, nombres: names });
    }

    const botonAtras = async() => {
        let [ data, names ] = await siguientes_AnterioresUsuarios('back');
         setUsersRegistrados({ datos: data, nombres: names });  
    }
   
    return (
        <>
            {  handleOpenModal.status 
                && <UpdatePersonal 
                    closeModal={ setHandleOpenModal } 
                    datos={ handleOpenModal.userSelected }
                    dataState={ usersRegistrados } 
                    updateState = {setUsersRegistrados}
                    /> 
            }

            <div className={ style.infoAndComponent }>
                <InfoRegistros />
            
                <table className={ style.registersTable}>  
                    <thead className={ style.registersTableThead} >
                        <tr className={ style.registersTableTr}>
                            <th className={ style.registersTh } ><b>#</b></th>
                            <th className={ style.registersTh } >Nombre</th>
                            <th className={ style.registersTh } >C&eacute;dula</th>
                            <th className={ style.registersTh } >Correo</th>
                            <th className={ style.registersTh } >&Aacute;rea</th>
                            <th className={ style.registersTh } >Rol</th>
                            <th className={ style.registersTh } >Acciones</th>
                        </tr>
                        </thead>
                    <tbody className={ style.registersTbody }>    
                       {
                           usersRegistrados.datos.map( user => (
                                <tr className={`${style.registerTrBody} animate__animated animate__fadeIn`} key={user.id}>
                                    <td className={style.childrenBody}><b>#{ indice++ }</b></td>                                 
                                    <td className={ style.childrenBody }>{ usersRegistrados.nombres[countName++] }</td>         
                                    <td className={ style.childrenBody }>V- { user.cedula }</td>
                                    <td className={ style.childrenBody }>{ user.email }</td>
                                    <td className={ style.childrenBody }>{ user.area_personal }</td>
                                    <td className={ style.childrenBody }>{ user.rol }</td>
                                    <td className={ style.childrenEdit}>
                                        <button 
                                            className={`${style.edit} ${style.botones}`} 
                                            onClick={ () => setHandleOpenModal({ status: true, userSelected: user }) }
                                        >
                                            Editar
                                        </button> 

                                        <button className={ `${style.delete} ${style.botones}`} 
                                            onClick={ () => deleteUser(user) }
                                        >
                                            Eliminar
                                        </button>  
                                    </td>
                                </tr> 
                           ))
                       }     
                    </tbody>
                </table>
                <button className={style.nextPersonal} onClick={ botonAtras }>
                    Atrás
                </button>
                <button className={style.nextPersonal} onClick={ botonVerMas } id='deshabilitar'>
                    Siguientes
                </button>
            </div>    
        </>
    )
}
export default TableUsers;