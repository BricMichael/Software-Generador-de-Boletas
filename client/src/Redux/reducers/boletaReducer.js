import types from "../types";



const initialState = {
    listFiveStudents: [],
    studentSelected: {nombres: '', grado: '', seccion: '', docente: '', textArea: '' },
    setLiteralIndicadores: [],
    gradoSeccion: { grado: '', seccion: '' },
}

const boletaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.fiveStudents:
            return {
                ...state,
                listFiveStudents: [...action.payload.data],
                gradoSeccion: {
                    grado: action.payload.grado,
                    seccion: action.payload.seccion,
                }
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

        case types.allIndicadoresOfUser:
            return{
                ...state,
                setLiteralIndicadores: [ ...action.payload ]
            }
            
        case types.updateLiteralDocente:
            return {
                ...state,
                setLiteralIndicadores: state.setLiteralIndicadores.map( prop => prop.indicador === action.payload.indicador 
                    ? { ...prop, literal: action.payload.literal } 
                    : prop )
            } 
            
        case types.savedBoletaTypes:
            return {
                ...state,
                studentSelected: {nombres: '', grado: '', seccion: '', docente: '', textArea: '' },
                setLiteralIndicadores: [ ...action.payload ]
            }    
        

        default:
            return state;
    }
}












export default boletaReducer;