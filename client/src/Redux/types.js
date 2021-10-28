const types = {
    allUsers: '[LOGIN] AllUsers',
    checkUser: '[LOGIN] checkUser',

    materiasTypes: '[INDICADOR] MateriasIndicadorByUser',
    momentoAndYear: '[INDICADOR] BusquedaMomentoAño',
    indicadoresByUser: '[INDICADOR] ShowIndicadorByUser',
    indicadorActive: '[INDICADOR] IndicadorActivo',
    refreshData: '[INDICADOR] RefrescarIndicador',
    limpiarInputsForm: '[INDICADOR] LimpiarInputsForm',
    deleteAnIndicador: '[INDICADOR] DeleteAnIndicador',
    limpiezaLogout: '[INDICADOR] ResetIndicadores',


    fiveStudents: '[BOLETA] FiveStudents',
    nextOrBackFiveStudents: '[BOLETA] nextOrBackFiveStudents',
    studentSelected: '[BOLETA] StudentSelected',
    textAreaAndDate: '[BOLETA SetTextAreaAndFecha]',
    allIndicadoresOfUser: '[BOLETA] IndicadoresBoleta',
    indicadorLiteralDocente: '[BOLETA] IndicadoresLiteralDocente',
    setLiteralEspecialista: '[BOLETA] setLiteralEspecialista',
    nameUsersFirmas: '[BOLETA] SetFirmasBoletas',
    checkLlegaronDatos: '[BOLETA] materiaWithIndicadores',
    botonResetState: '[BOLETA] BotonResetData',
    savedBoletaTypes: '[BOLETA] GuardarBoleta',


    setDataUser: '[CONFIG] Set10Users',
    existeRolDirector: '[CONFIG] Existe rol Director',
    existeRolCoordinador: '[CONFIG] Existe rol Coordinador',

    dataBoletaByStudent: '[Descarga] DataBoletaAGenerar',
    resetDataState: '[Descarga] ResetDataAlGenerarBoleta'

}







export default types;