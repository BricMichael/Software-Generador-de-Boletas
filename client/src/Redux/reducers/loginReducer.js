import types from "../types";


const initialState = { isAuthenticated: false };

const loginReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.checkUser:
            return {
                ...state,
                isAuthenticated: action.payload
            };   
    
        default:
            return state;
    }
}

export default loginReducer;