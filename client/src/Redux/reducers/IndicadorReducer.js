import types from "../types";

const initialState = {
    indicadoresByUser: [],
    updateIndicador: {
        estado: false,
        dataIndicador: { indicador: '', literal: '', area: '', condicion_especial: '', grado: '', momento: '' },
    },
    materias: {
        materiasDocente: [],
        materiasEspecialista: [],
    },
    momento: '',
    grado: ''
}

const indicadorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.momentoAndYear:
            return {
                ...state,
                indicadoresByUser: [...action.payload.data],
                momento: action.payload.momento,
                grado: action.payload.grado
            }

        case types.materiasTypes:
            return {
                ...state,
                materias: {
                    materiasDocente: [...action.payload.materiasDocente],
                    materiasEspecialista: [...action.payload.materiasEspecialista],
                }
            }

        case types.materiaEstado:
            let estadoMateriaCambiado = {};
            if (action.payload.tipo === 'Docente') {
                estadoMateriaCambiado = {
                    materiasDocente: state.materias.materiasDocente.map(m => m.id === action.payload.id ? ({...m, estado: !action.payload.estado }) : m),
                    materiasEspecialista: [...state.materias.materiasEspecialista],
                }
            } else {
                estadoMateriaCambiado = {
                    materiasDocente: [...state.materias.materiasDocente],
                    materiasEspecialista: state.materias.materiasEspecialista.map(m => m.id === action.payload.id ? ({...m, estado: !action.payload.estado }) : m),
                }
            }
            return {
                ...state,
                materias: estadoMateriaCambiado
            }    

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
                    dataIndicador: { ...action.payload }
                }
            };
        case types.refreshData:
            return {
                ...state,
                indicadoresByUser: state.indicadoresByUser.map(
                    (newValue) => newValue.id === action.payload.id
                        ? action.payload.dataForUpdate
                        : newValue
                )
            }

        case types.limpiarInputsForm:
            return {
                ...state,
                updateIndicador: {
                    estado: false,
                    dataIndicador: { indicador: '', literal: '', area: '', condicion_especial: '', grado: '', momento: '', proposito_general: '' },
                }
            }

        case types.deleteAnIndicador:
            return {
                ...state,
                indicadoresByUser: state.indicadoresByUser.filter(idIteration => idIteration.id !== action.payload)
            };

        case types.limpiezaLogout:
            return {
                ...initialState,
                materias: state.materias,
            };

        default:
            return state;
    }
}


export default indicadorReducer;