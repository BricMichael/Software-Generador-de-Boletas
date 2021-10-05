import types from '../types';

const initialState = {
    dataNameUsers: [],
    existeRolDirector: false,
    existeRolCoordinador: false,

}
const configReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.setDataUser:
            return {
                ...state,
                dataNameUsers: [...action.payload]
            }
        case types.existeRolDirector:
            return {
                ...state,
                existeRolDirector: true
            }
        case types.existeRolCoordinador:
            return {
                ...state,
                existeRolCoordinador: true
            }

        default:
            return state;
    }
}

export default configReducer;