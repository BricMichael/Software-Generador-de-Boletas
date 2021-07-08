import types from "../types";



const initialState = {
    listFiveStudents: [],
    studentSelected: {nombres: '', grado: '', seccion: '', docente: '', textArea: '' },
    setLiteralIndicadores: [],
    grado: '',
    especialidades: [],
}

const boletaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.fiveStudents:
            return {
                ...state,
                listFiveStudents: [...action.payload.data],
                grado: action.payload.grado,
                especialidades: [ ...action.payload.indicadoresEspecialista ]
            };
        
        case types.nextFiveStudents:
            return {
                ...state,
                listFiveStudents: [...action.payload ]
            }
            
        case types.studentSelected:
            return {
                ...state,
                studentSelected: { ...action.payload, textArea:'' }
            }      
    
        default:
            return state;
    }
}












export default boletaReducer;