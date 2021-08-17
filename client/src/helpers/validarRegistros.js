export const validarCampos = (data) => {
    let valores = Object.values(data);

    for ( let campo of valores ) {
        if( campo === '' || campo === 'default' ) return 'error'; 
    }
    return 'excelente'; 
}


export const removerEspacios = (data) => {
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