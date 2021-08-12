export const validarCampos = (data) => {
    let valores = Object.values(data);

    for ( let campo of valores ) {
        if( campo === '' || campo === 'default' ) return 'error'; 
    }
    return 'excelente'; 
}