import types from "../types";

const initialState = {
    indicadoresByUser: [],
    momentoAnio: { momento: '', anio: '' },
    updateIndicador: {
        estado: false,
        dataIndicador: { indicador: '', literal: '', area: '', condicion_especial: '', grado: '', momento: ''},
    },
    materias: {
        materiasDocente: [],
        materiasEspecialista: [],
    }
}   

const indicadorReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.momentoAndYear:
            return {
                ...state,
                momentoAnio: { 
                    momento: action.payload.momento, 
                    anio: action.payload.year 
                },
                indicadoresByUser: [ ...action.payload.data ]
            }

        case types.materiasTypes:
            return {
                ...state,
                materias: {
                    materiasDocente: [...action.payload.materiasDocente],
                    materiasEspecialista: [...action.payload.materiasEspecialista],
                }
            }

        case types.indicadoresByUser:
            return {
                ...state,
                indicadoresByUser: [...action.payload]           
            };

        case types.indicadorActive:
            return {
                ...state,
                updateIndicador: {
                    estado: true,
                    dataIndicador: {...action.payload}
                }
            };
        case types.refreshData:
            return { 
                ...state,
                indicadoresByUser: state.indicadoresByUser.map( 
                    (newValue) => newValue.id === action.payload.id 
                        ? action.payload.refrescarData  
                        : newValue
                    )
            }    

        case types.limpiarInputsForm:
            return {
                ...state,
                updateIndicador: {
                    estado: false,
                    dataIndicador: { indicador: '', literal: '', area: '', condicion_especial: '', grado: '', momento: ''},
                }
            }    

        case types.deleteAnIndicador:
            return {
                ...state,
                indicadoresByUser: state.indicadoresByUser.filter( idIteration =>  idIteration.id !== action.payload)
            }; 

        case types.limpiezaLogout:      
            return {
                ...state,
                indicadoresByUser: [],
                momentoAnio: { momento: '', anio:'' },
                updateIndicador: {
                    estado: false,
                    dataIndicador: { indicador: '', literal: '', area: '', condicion_especial: '', grado: '', momento: ''},
                },
                materias: {
                    materiasDocente: [],
                    materiasEspecialista: [],
                }
            };    
    
        default:
            return state;
    }
}






export default indicadorReducer;