import * as api from '../../api/api';
import { alertSuccess } from '../../helpers/alerts';
import { validarCampos } from '../../helpers/validarRegistros';
import types from '../types';



export const limpiarMsgEstado = (statusRegistro) => { // clean estados de registros, student y personal.
    setTimeout(() => {
        statusRegistro({ status: false, msg: '', type: '' })
    }, 2500);
}

export const registroEstudianteAction = async (values, reset, statusRegistro) => {
    const respErrores = validarCampos(values);

    if (respErrores === 'error') {
        statusRegistro({ status: true, msg: 'Asegurate de haber llenado todos los campos', type: 'error' })
        limpiarMsgEstado(statusRegistro);
    } else {
        const { data: { msg } } = await api.apiRegisterStudent(values);
        let verificacionTipo = msg === 'Estudiante registrado exitosamente';
        verificacionTipo && reset(); // el registro fue exitoso y se limpia el form.

        statusRegistro({ status: true, msg, type: verificacionTipo ? 'exito' : 'error' })
        limpiarMsgEstado(statusRegistro);
    }
}

export const registroPersonalAction = async (values, reset, statusRegistro) => {
    const { email, password } = values;
    const respErrors = validarCampos(values);

    if (email.length < 14) statusRegistro({ status: true, msg: 'Error: El correo electrónico debe ser mayor a 13 caracteres', type: 'error' });

    else if (password.length < 7) statusRegistro({ status: true, msg: 'Error: La contraseña debe ser mayor a 6 caracteres', type: 'error' })

    else if (respErrors === 'error') statusRegistro({ status: true, msg: 'Asegurate de haber llenado todos los campos', type: 'error' });

    else {
        const { data: { msg } } = await api.apiRegisterPersonal(values);
        let verificacionTipo = msg === 'Usuario registrado exitosamente';
        verificacionTipo && reset();
        statusRegistro({ status: true, msg, type: verificacionTipo ? 'exito' : 'error' })
    }
    limpiarMsgEstado(statusRegistro);
}

const twoNamesOfUsers = (data) => {
    const names = [];

    for (const name of data) {
        names.push(name.nombre.split(' ')[0] + ' ' + name.nombre.split(' ')[2])
    }

    return names;
}

let count = 0;
export const allUsuarios = async () => {
    const { data } = await api.apiGetAllRegisters();
    const names = twoNamesOfUsers(data);

    count = 0; // reiniciar el contador cada que se renderice el component
    return new Promise((resolve, reject) => {
        resolve([data, names]);
    })
}

export const siguientes_AnterioresUsuarios = async (accion) => { // accion = next or back 

    let newData = []

    if (accion === 'next') {
        count += 4;

        const { data } = await api.apiGetAllRegisters(count);
        const names = twoNamesOfUsers(data);

        newData.push(data, names);
        if (data[0].aviso) {
            let btn = document.getElementById('deshabilitar')
            btn.style.display = 'none';
        }

    } else {
        count = count <= 0 ? count = 0 : count - 4;
        const { data } = await api.apiGetAllRegisters(count);
        const names = twoNamesOfUsers(data);

        newData.push(data, names);
        if (!data[0].aviso) {
            let btn = document.getElementById('deshabilitar');
            btn.style.display = 'initial';
        }
    }

    return new Promise((resolve, reject) => {
        resolve(newData);
    })
}


export const updateStudentModal = async (id, values, setState) => {
    await api.apiUpdateStudent(id, values);
    values.id = id;
    setState({ state: false, dataEstudiante: values })
    alertSuccess('Datos actualizados exitosamente', 'center');
}


export const updateRegistroAction = async (id, newData) => {
    await api.updateRegisterPersonal(id, newData);
    alertSuccess('Datos actualizados exitosamente', 'center');
}


export const eliminaRegistroAction = (user, state, updateState) => async (dispatch) => {
    await api.apiDeleteRegister(user.id, 'personal');

    const NameToDelete = user.nombre.split(' ')[0] + ' ' + user.nombre.split(' ')[2];

    const newData = state.datos.filter(registro => registro.id !== user.id);
    const nameFilters = state.nombres.filter(name => name !== NameToDelete);

    updateState({ datos: newData, nombres: nameFilters });
    dispatch({ type: types.setDataUser, payload: nameFilters })
    alertSuccess('El usuario ha sido eliminado', 'center');
}