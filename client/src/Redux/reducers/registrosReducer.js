import types from "../types";


const initialState = {
    updateActive: '',
    allUsersRegisters: []
}

const registrosReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.registrarEstudiante:
            return {}

        case types.registrarUsuario:
            return {}          
    
        default:
            return state;
    }
}

export default registrosReducer;