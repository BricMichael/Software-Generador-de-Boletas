import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alertDeleteItems } from '../../helpers/alerts';
import { setDataUser } from '../../Redux/actions/configuracionActions';
import { allUsuarios, eliminaRegistroAction, siguientes_AnterioresUsuarios } from '../../Redux/actions/usuariosActions';
import style from '../../views/Sistema/Usuarios/registrosUsers.module.css'
import InfoRegistros from '../InfoDataRegistros/InfoRegistros';
import UpdatePersonal from '../Modal/UpdatePersonal';




const TableUsers = ({ countName = 0 }) => {
    const dispatch = useDispatch();
    const [handleOpenModal, setHandleOpenModal] = useState({ status: false, userSelected: {} });
    const [usersRegistrados, setUsersRegistrados] = useState({ datos: [], nombres: [] })

    useEffect(() => {
        let ejectuar = async () => {
            const [data, names] = await allUsuarios();
            setUsersRegistrados({ datos: data, nombres: names });
            dispatch(setDataUser(names));
        }
        ejectuar();

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

                    <table className={style.registersTable}>
                        <thead className={style.registersTableThead} >
                            <tr className={style.registersTableTr}>
                                <th className={style.registersTh} >Nombre</th>
                                <th className={style.registersTh} >C&eacute;dula</th>
                                <th className={style.registersTh} >Correo</th>
                                <th className={style.registersTh} >&Aacute;rea</th>
                                <th className={style.registersTh} >Rol</th>
                                <th className={style.registersTh} >Acciones</th>
                            </tr>
                        </thead>
                        <tbody className={style.registersTbody}>
                            {
                                usersRegistrados.datos.map(user => (
                                    <tr className={`${style.registerTrBody} animate__animated animate__fadeIn`} key={user.id}>
                                        <td className={style.childrenBody}>{usersRegistrados.nombres[countName++]}</td>
                                        <td className={style.childrenBody}>V- {user.cedula}</td>
                                        <td className={style.childrenBody}>{user.email}</td>
                                        <td className={style.childrenBody}>
                                            {user.area_personal === 'null' ? 'No' : user.area_personal}
                                        </td>
                                        <td className={style.childrenBody}>{user.rol}</td>
                                        <td className={style.childrenBody}>
                                            <button
                                                className={`${style.edit} ${style.botones}`}
                                                onClick={() => setHandleOpenModal({ status: true, userSelected: user })}
                                            >
                                                Editar
                                            </button>

                                            <button className={`${style.delete} ${style.botones}`}
                                                onClick={() => deleteUser(user)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
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