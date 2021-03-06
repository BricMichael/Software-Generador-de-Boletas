import * as api from '../../api/api';
import Swal from 'sweetalert2';
import { validarCampos } from '../../helpers/validarRegistros';

// type exito or error

export const registroEstudianteAction = async( values, reset, statusRegistro ) => {
    const respErrores = validarCampos (values);

    if( respErrores === 'error' ) {
        statusRegistro({ status: true, msg: 'Asegurate de haber llenado todos los campos', type: 'error' })
        setTimeout(() => {
            statusRegistro({ status: false, msg: '', type: ''})
        }, 2500);
    } else {
        const { data: {msg} } = await api.apiRegisterStudent( values );
        let verificacionTipo = msg === 'Estudiante registrado exitosamente';
        verificacionTipo && reset(); // el registro fue exitoso y se limpia el form.

        statusRegistro({ status: true, msg, type: verificacionTipo ? 'exito' : 'error' })
        setTimeout(() => {
            statusRegistro({ status: false, msg: '', type: ''})
        }, 2500);
    }
}

export const registroPersonalAction = async( values, reset, statusRegistro ) => { 
    const { email, password } = values;
    const respErrors = validarCampos(values);

    if( email.length < 14 ) {
        statusRegistro({ status: true, msg: 'Error: El correo electrónico debe ser mayor a 13 caracteres', type: 'error' });
    } 
    else if (  password.length < 7 ) {
        statusRegistro({ status: true, msg: 'Error: La contraseña debe ser mayor a 6 caracteres', type: 'error' })
    } 
    else if ( respErrors === 'error' ) {
        statusRegistro({ status: true, msg: 'Asegurate de haber llenado todos los campos', type: 'error' });
    }
    else {
        const { data: {msg} } = await api.apiRegisterPersonal( values );
        let verificacionTipo = msg === 'Usuario registrado exitosamente';
        verificacionTipo && reset();
        statusRegistro({ status: true, msg, type: verificacionTipo ? 'exito' : 'error' })
    }
    setTimeout(() => {
        statusRegistro({ status: false, msg: '', type: ''})
    }, 2500);
}

const twoNamesOfUsers = (data) => {
    const names = [];

    for (const name of data) {
        names.push( name.nombre.split(' ')[0] + ' ' + name.nombre.split(' ')[2] )  
    }

    return names;
}

let count = 0; 
export const allUsuarios = async() => {
    const { data } = await api.apiGetAllRegisters();
    const names = twoNamesOfUsers( data );

    count = 0; // reiniciar el contador cada que se renderice el component
    return new Promise( (resolve, reject ) => {
        resolve([ data, names ]);
    })
}

export const siguientes_AnterioresUsuarios = async( accion ) => { // accion = next or back 

    let newData = []

    if ( accion === 'next' ) {
        count += 4;

        const { data } = await api.apiGetAllRegisters( count);
        const names = twoNamesOfUsers( data);

        newData.push(data, names);
        data[0].aviso && document.getElementById('deshabilitar').setAttribute('disabled','true');

    }else {
        count =  count <= 0 ? count = 0 : count - 4;
        const { data } = await api.apiGetAllRegisters( count);
        const names = twoNamesOfUsers( data);
        
        newData.push( data, names );
        !data[0].aviso && document.getElementById('deshabilitar').removeAttribute('disabled');    
    }
   
    return new Promise( (resolve, reject ) => {
        resolve(newData);
    })
}

export const updateStudentModal = async( id, values, setState ) => {
    await api.apiUpdateStudent( id, values );
    values.id = id;
    setState({ state: false, dataEstudiante: values })
    Swal.fire({
         icon: 'success', 
        title: 'Datos actualizados exitosamente', 
        showConfirmButton: false, 
        timer: 1200,
        position: 'center',
        width: '45%'
    });
}


export const updateRegistroAction = async(id, newData) => {
    await api.updateRegisterPersonal( id, newData );
    Swal.fire( 
        { icon: 'success', 
        title: 'Datos actualizados exitosamente', 
        showConfirmButton: false, 
        timer: 1200,
        position: 'center',
        width: '45%'
    });
}



export const eliminaRegistroAction = async( user, state, updateState ) => {
    await api.apiDeleteRegister( user.id, 'personal' );

    const NameToDelete = user.nombre.split(' ')[0] + ' ' + user.nombre.split(' ')[2];

    const newData = state.datos.filter( registro => registro.id !== user.id );
    const nameFilters = state.nombres.filter( name => name !== NameToDelete );

    updateState({ datos: newData, nombres: nameFilters });
 }