import types from "../types";


const initialState = {
    personal: [],
    isAuthenticated: false

}

const loginReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.allUsers:
            return {
                ...state,
                personal: action.payload
            }; 

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