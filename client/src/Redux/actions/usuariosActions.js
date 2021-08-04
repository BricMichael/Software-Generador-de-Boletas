import * as api from '../../api/api';


// type exito or error

export const registroEstudianteAction = async( values, reset, statusRegistro ) => {
    const { data: {msg} } = await api.apiRegisterStudent( values );
    let verificacionTipo = msg === 'Estudiante registrado exitosamente';
    verificacionTipo && reset();
    statusRegistro({ status: true, msg, type: verificacionTipo ? 'exito' : 'error' })
    setTimeout(() => {
        statusRegistro({ status: false, msg: '', type: ''})
    }, 4000);
}

export const registroPersonalAction = async( values, reset, statusRegistro ) => { 
    const { email, password } = values;

    if( email.length < 14 ) {
        statusRegistro({ status: true, msg: 'Error: El correo electrónico debe ser mayor a 13 caracteres', type: 'error' });
     } 
    else if (  password.length < 7 ) {
        statusRegistro({ status: true, msg: 'Error: La contraseña debe ser mayor a 6 caracteres', type: 'error' })
     } 
    else {
        const { data: {msg} } = await api.apiRegisterPersonal( values );
        let verificacionTipo = msg === 'Usuario registrado exitosamente';
        verificacionTipo && reset();
        statusRegistro({ status: true, msg, type: verificacionTipo ? 'exito' : 'error' })
     }
    setTimeout(() => {
        statusRegistro({ status: false, msg: '', type: ''})
    }, 4000);
}

export const allUsuarios = async() => {
    const { data } = await api.apiGetAllRegisters();

    return new Promise( (resolve, reject ) => {
        resolve( data );
    })
}