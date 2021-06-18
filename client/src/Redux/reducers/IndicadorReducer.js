import types from "../types";

const initialState = {
    indicadoresByUser: [],
    carga: null
}


const indicadorReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.indicadoresByUser:
            return {
                ...state,
                indicadoresByUser: action.payload
            };

        case types.updateTable:
            return {
                ...state,
                indicadoresByUser: [...state.indicadoresByUser, action.payload]
            };

        case types.deleteAnIndicador:
            return {
                ...state,
                indicadoresByUser: state.indicadoresByUser.filter( id =>  id.id_indicador !== action.payload)
            }; 

        case types.limpiezaLogout:
            
            return {
                ...state,
                carga : null,
                indicadoresByUser: []
            }    
    
        default:
            return state;
    }
}






export default indicadorReducer;