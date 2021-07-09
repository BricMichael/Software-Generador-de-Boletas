import types from "../types";



const initialState = {
    listFiveStudents: [],
    studentSelected: {nombres: '', grado: '', seccion: '', docente: '', textArea: '' },
    setLiteralIndicadores: [],
    grado: '',   
}

const boletaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.fiveStudents:
            return {
                ...state,
                listFiveStudents: [...action.payload.data],
                grado: action.payload.grado,
                setLiteralIndicadores: [ ...action.payload.sendCopyToState ]
            };   
        
        case types.nextFiveStudents:
            return {
                ...state,
                listFiveStudents: [...action.payload ]
            }
            
        case types.studentSelected:
            return {
                ...state,
                studentSelected: { ...action.payload.estudiante, textArea:'' },
                setLiteralIndicadores: [ ...action.payload.sendCopyToState ]
            }
        case types.updateLiteralDocente:
            return {
                ...state,
                setLiteralIndicadores: state.setLiteralIndicadores.map( prop => prop.descripcion === action.payload.indicador ? { ...prop, literal: action.payload.literal } : prop)
            }          
    
        default:
            return state;
    }
}












export default boletaReducer;