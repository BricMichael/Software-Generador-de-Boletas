import types from "../types";



const initialState = {
    listFiveStudents: [],
    studentSelected: { nombres: '', grado: '', seccion: '', docente: '' },
    descripAndDate: { textArea: '', inicioMomento: '', finMomento: '', anioEscolar: '' },
    gradoSeccion: { grado: '', seccion: '' },
    momento: '',
    setLiteralIndicadores: [],
    literalesEspecialistas: [],
    reset: 0
}

const boletaReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.fiveStudents:
            return {
                ...state,
                listFiveStudents: [...action.payload.data],
                gradoSeccion: {
                    grado: action.payload.grado,
                    seccion: action.payload.seccion,
                }
            };

        case types.nextFiveStudents:
            return {
                ...state,
                listFiveStudents: [...action.payload]
            }

        case types.studentSelected:
            return {
                ...state,
                studentSelected: { ...action.payload }
            }
        case types.textAreaAndDate:
            return {
                ...state,
                descripAndDate: action.payload
            }
        case types.allIndicadoresOfUser:
            return {
                ...state,
                setLiteralIndicadores: [...action.payload.data],
                momento: action.payload.momento
            }

        case types.updateLiteralDocente:
            return {
                ...state,
                setLiteralIndicadores: state.setLiteralIndicadores.map(prop => prop.id === action.payload.id
                    ? { ...prop, literal: action.payload.literal }
                    : prop)
            }

        case types.setLiteralEspecialista:
            const check = state.literalesEspecialistas.find(value => value.area === action.payload.indicador.area);

            if (check) {
                return {
                    ...state,
                    literalesEspecialistas: state.literalesEspecialistas.map(value => value.area === check.area
                        ? action.payload.indicador
                        : value
                    )
                }
            } else {
                return {
                    ...state,
                    literalesEspecialistas: [...state.literalesEspecialistas, action.payload.indicador]
                }
            }

        case types.savedBoletaTypes:
            return {
                ...state,
                studentSelected: { nombres: '', grado: '', seccion: '', docente: '', textArea: '' },
                setLiteralIndicadores: [...action.payload],
                reset: state.reset + 1
            }

        case types.botonResetState:
            return {
                ...initialState
            }

        default:
            return state;
    }
}












export default boletaReducer;