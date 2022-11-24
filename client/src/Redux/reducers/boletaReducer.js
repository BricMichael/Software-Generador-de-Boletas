import types from "../types";



const initialState = {
    listFiveStudents: [],
    studentSelected: { nombres: '', grado: '', seccion: '', docente: '', cedula_estudiante: '' },
    descripAndDate: { inicioMomento: '', finMomento: '', anioEscolar: '', momento: 'momento 1', observacion: '' },
    gradoSeccion: { grado: '', seccion: '' },
    momento: '',
    anioIndicadores: '',
    indicadoresByUser: [],
    literalIndicadoresDocentes: [],
    literalesEspecialistas: [],
    personalFirmas: { directora: '', coordinadora: '' },
    indicadoresByUserWithData: false,
    materiasWithIndicadores: [],
    boletasPendientesBySeccion: 0
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
                },
                boletasPendientesBySeccion: action.payload.boletasPendientes.total
            }

        case types.nextOrBackFiveStudents:
            return {
                ...state,
                listFiveStudents: [...action.payload.data],
                boletasPendientesBySeccion: action.payload.boletasPendientes.total
            }

        case types.studentSelected:
            return {
                ...state,
                studentSelected: { ...action.payload },
                descripAndDate:  { ...state.descripAndDate, observacion: '' }
            }
        case types.textAreaAndDate:
            return {
                ...state,
                descripAndDate: action.payload
            }
        case types.allIndicadoresOfUser:
            return {
                ...state,
                indicadoresByUser: [...action.payload.data],
                momento: action.payload.momento,
                indicadoresByUserWithData: false,
                // anioIndicadores: action.payload.anioIndicadores
            }
        case types.checkLlegaronDatos:
            return {
                ...state,
                materiasWithIndicadores: action.payload,
                indicadoresByUserWithData: true
            }
        case types.indicadorLiteralDocente:
            const check = state.literalIndicadoresDocentes.find(value => value.area === action.payload.area);

            if (check) {
                return {
                    ...state,
                    literalIndicadoresDocentes: state.literalIndicadoresDocentes.map(
                        item => item.area === check.area ? action.payload : item
                    )
                }
            } else {
                return {
                    ...state,
                    literalIndicadoresDocentes: [...state.literalIndicadoresDocentes, action.payload]
                }
            }

        case types.setLiteralEspecialista:
            const checkArea = state.literalesEspecialistas.find(value => value.area === action.payload.area);

            if (checkArea) {
                return {
                    ...state,
                    literalesEspecialistas: state.literalesEspecialistas.map(value => value.area === checkArea.area
                        ? action.payload : value
                    )
                }
            } else {
                return {
                    ...state,
                    literalesEspecialistas: [...state.literalesEspecialistas, action.payload]
                }
            }

        case types.nameUsersFirmas:
            return {
                ...state,
                personalFirmas: {
                    directora: action.payload.directora,
                    coordinadora: action.payload.coordinadora
                }
            }

        case types.savedBoletaTypes:
            const condition = state.boletasPendientesBySeccion === 1;
            const checkIfUserHasBoletaCreated = state.studentSelected.boleta_generada === 'Generada';

            return {
                ...state,
                studentSelected: { nombres: '', grado: '', seccion: '', docente: condition ? '' : state.studentSelected.docente , cedula_estudiante: ''},
                literalIndicadoresDocentes: [],
                literalesEspecialistas: [],
                boletasPendientesBySeccion: checkIfUserHasBoletaCreated ? state.boletasPendientesBySeccion : state.boletasPendientesBySeccion - 1,
                listFiveStudents: condition
                    ? state.listFiveStudents.map(students => ({ ...students, boleta_generada: 'Pendiente' }))
                    : state.listFiveStudents.map(item => item.id === action.payload.id
                        ? { ...item, boleta_generada: 'Generada' }
                        : item
                    ),
                descripAndDate: condition ? initialState.descripAndDate : state.descripAndDate
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