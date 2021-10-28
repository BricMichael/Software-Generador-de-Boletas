import types from "../types";

const initialState = {
    dataBoleta: []
}



const boletaReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.dataBoletaByStudent:
            return {
                ...state,
                dataBoleta: action.payload
            }

        case types.resetDataState:
            return {
                ...initialState
            }

        default:
            return state;
    }

}

export default boletaReducer;