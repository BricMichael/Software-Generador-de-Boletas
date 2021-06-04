
const initialState = {
    personal: [],
    userActivo: ''
}

const loginReducer = (state = initialState, action ) => {
    switch (action.type) {
        case 'allUsers':
            return {
                ...initialState,
                personal: action.payload
            };
        case 'USER ACTIVE':
            return {
                ...state,
                userActivo: action.payload
            }  
    
        default:
            return state;
    }
}

export default loginReducer;