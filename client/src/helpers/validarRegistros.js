export const validarCampos = (data) => {
    for (const key in data) {
        if ( !data[key] && key !== 'especialidad' ) return 'error';
    } 
    return 'excelente'; 
}


export const removerEspacios = (data) => { //evaluar que cada item o nombre no tenga espacios al inicio o final.
    let newValor = [];

    for (let item of data) {
       if( item !== '' ) newValor.push( item );
    }

    let nameSend = newValor[0] + ' ' + newValor[2]; 
    return nameSend;
}

export const cambioDeDatos = (data1, data2) => {
    let datosOriginales = Object.values(data1);
    let datosModificados = Object.values(data2);
    
    for (let i = 0; i < datosOriginales.length; i++) {
        if ( datosOriginales[i] !== datosModificados[i] ) return true    
    }
    return false;
}