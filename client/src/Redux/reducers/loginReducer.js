import types from "../types";


const initialState = {
    personal: [],
    userActivo: ''
}

const loginReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.allUsers:
            return {
                ...initialState,
                personal: action.payload
            };
        case types.userActive:
            return {
                ...state,
                userActivo: action.payload
            }  
    
        default:
            return state;
    }
}

export default loginReducer;