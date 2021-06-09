import types from "../types";


const initialState = {
    personal: []
}

const loginReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.allUsers:
            return {
                ...initialState,
                personal: action.payload
            }; 
    
        default:
            return state;
    }
}

export default loginReducer;