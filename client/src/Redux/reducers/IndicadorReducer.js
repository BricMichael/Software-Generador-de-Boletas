import types from "../types";

const initialState = {
    indicadoresByUser: [],
    updateIndicador: {
        estado: false,
        dataIndicador: { descripcion: '', literal: '', area: '', condicion_especial: '', id_indicador: ''},
    }
}   

const indicadorReducer = ( state = initialState, action ) => {
    switch (action.type) {
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
                    (newValue) => newValue.id_indicador === action.payload.id 
                        ? action.payload.refrescarData  
                        : newValue
                    )
            }    

        case types.limpiarInputsForm:
            return {
                ...state,
                updateIndicador: {
                    estado: false,
                    dataIndicador: { descripcion: '', literal: '', area: '', condicion_especial: '', id_indicador: ''},
                }
            }    

        case types.deleteAnIndicador:
            return {
                ...state,
                indicadoresByUser: state.indicadoresByUser.filter( id =>  id.id_indicador !== action.payload)
            }; 

        case types.limpiezaLogout:      
            return {
                ...state,
                indicadoresByUser: [],
                updateIndicador: {
                    estado: false,
                    dataIndicador: { descripcion: '', literal: '', area: '', condicion_especial: '', id_indicador: ''}
                }
            }    
    
        default:
            return state;
    }
}






export default indicadorReducer;