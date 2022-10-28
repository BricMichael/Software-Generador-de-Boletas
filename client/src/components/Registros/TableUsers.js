import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { apiTotalUsersByRol } from '../../api/api'
import { alertDeleteItems } from '../../helpers/alerts';
import { existeRolCoordinadorAction, existeRolDirectorAction, setDataUser } from '../../Redux/actions/configuracionActions';
import { allUsuarios, eliminaRegistroAction, siguientes_AnterioresUsuarios } from '../../Redux/actions/usuariosActions';
import style from '../../views/Sistema/Usuarios/registrosUsers.module.css'
import InfoRegistros from '../InfoDataRegistros/InfoRegistros';
import UpdatePersonal from '../Modal/UpdatePersonal';




const TableUsers = ({ countName = 0 }) => {
    const dispatch = useDispatch();
    const [handleOpenModal, setHandleOpenModal] = useState({ status: false, userSelected: {} });
    const [usersRegistrados, setUsersRegistrados] = useState({ datos: [], nombres: [] })

    useEffect(() => {
        const askRoles = async () => {
            const { data } = await apiTotalUsersByRol();
            for (const item of data) {
                if (item.rol === 'coordinador' && +item.total === 1) dispatch(existeRolCoordinadorAction())    
                if (item.rol === 'director' && +item.total === 1) dispatch(existeRolDirectorAction())
            }
        }    

        let ejectuar = async () => {
            const [data, names] = await allUsuarios();
            setUsersRegistrados({ datos: data, nombres: names });
            dispatch(setDataUser(names));
        }

        ejectuar();
        askRoles();

        return () => {
            setUsersRegistrados({ datos: [], nombres: [] });
        }
    }, [])

    const deleteUser = async (user) => {
        const response = await alertDeleteItems('¿Eliminar usuario?');

        response && dispatch(eliminaRegistroAction(user, usersRegistrados, setUsersRegistrados));
    }

    const botonVerMas = async () => {
        let [data, names] = await siguientes_AnterioresUsuarios('next');
        setUsersRegistrados({ datos: data, nombres: names });
    }

    const botonAtras = async () => {
        let [data, names] = await siguientes_AnterioresUsuarios('back');
        setUsersRegistrados({ datos: data, nombres: names });
    }

    return (
        <>
            {handleOpenModal.status
                && <UpdatePersonal
                    closeModal={setHandleOpenModal}
                    datos={handleOpenModal.userSelected}
                    dataState={usersRegistrados}
                    updateState={setUsersRegistrados}
                />
            }
            {usersRegistrados.datos.length === 0
                ? <p>Cargando...</p>
                : <div className={style.infoAndComponent}>
                    <InfoRegistros />
                    <div className={style.containerCards}>
                    {   usersRegistrados.datos.length > 0 &&
                        usersRegistrados.datos.map( (user, indice) => (               
                            <div className={style.singleCard} key={user.id}>
                                <div className={style.singleCard_top}>
                                    <b className={style.singleCard_indice}>#{indice}</b>
                                    <p className={style.singleCard_nombreUser}>
                                        {user.nombre.split(' ')[0] + ' ' + (user.nombre.split(' ')[2] ? user.nombre.split(' ')[2] : '') }
                                    </p>
                                    <div>
                                        <img 
                                            src='/editIcon.png' 
                                            alt='Icono editar'
                                            style={{ width: '1.15rem', height: '1.15rem', marginRight: '4px', cursor: 'pointer' }}   
                                            onClick={() => setHandleOpenModal({ status: true, userSelected: user })}                          
                                        />
                                        <img 
                                            src='/deleteIconRed.webp' 
                                            alt='Icono eliminar'
                                            style={{ width: '1.15rem', height: '1.15rem', cursor: 'pointer' }}   
                                            onClick={() => deleteUser(user)}                                    
                                        />
                                    </div>
                                </div>
                                <div className={style.singleCard_body}>
                                    <p className={style.singleCard_role}>{user.rol.slice(0,1).toUpperCase() + user.rol.slice(1)}</p>               
                                    <p><b>V-</b>{user.cedula}</p>
                                    <p className={style.educacion_child}>Preescolar</p>
                                </div>

                                <div className={style.singleCard_footer}>                
                                    <p>{user.email}</p>                               
                                </div>
                            </div>                                                   
                        ))
                    }
                    </div>
                    <div className={style.tableUser__buttons}>
                        <button className={style.nextPersonal} onClick={botonAtras} id='backBtn' type='button' style={{ display: 'none' }} >
                            Anteriores
                        </button>
                        <button className={style.nextPersonal} onClick={botonVerMas} id='nextBtn' type='button'>
                            Siguientes
                        </button>
                    </div>                                   
                </div>
            }
        </>
    )
}
export default TableUsers;