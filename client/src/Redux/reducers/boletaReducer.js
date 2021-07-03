import types from "../types";



const initialState = {
    listFiveStudents: [],
    studentSelected: {nombres: '', grado: '', seccion: '', docente: '', textArea: '' },
    setLiteralIndicadores: [],
}

const boletaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.fiveStudents:
            return {
                ...state,
                listFiveStudents: [...action.payload]
            };
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