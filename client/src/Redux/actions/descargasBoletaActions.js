import { apiGenerarBoletaExistente, apiGetBoletaByCedulaAndMomento } from "../../api/api"
import { alertNoResults, BoletaEnProcesoAlert } from "../../helpers/alerts";
import { downloandBoletaAndMsgSuccess } from "../../helpers/creacionBoleta";
import types from "../types";

export const getDataBoletaByStudent = (datos, resetState, setLoading) => async (dispatch) => {
    try {
        const { anioEscolar, ...rest } = datos;
        rest.anio_escolar = `${anioEscolar}-${+anioEscolar + 1}`; //si escriben 2021 concatenar el año siguiente, 2021/2022
        const { data } = await apiGetBoletaByCedulaAndMomento(rest);

        dispatch({
            type: types.dataBoletaByStudent, payload: data
        })
        setLoading(false);

        if (data.length >= 1) resetState()
        else {
            resetState(datos); // si no hay data, dejar los campos del formulario igual.
            alertNoResults();
        }
    } catch (err) {
        console.log(err);
    }
}

export const limpiarDataBoleta = () => ({ type: types.resetDataState });


export const generarBoletaExistente = (dataBoleta) => async (dispatch, getState) => {
    try {
        BoletaEnProcesoAlert();
        const firmas = getState().boleta.personalFirmas;

        const dataToGeneratePDF = {
            indicadoresByArea: dataBoleta.indicadores_boleta.docente,
            literalesEspecialistas: dataBoleta.indicadores_boleta.especialista,
            momento: dataBoleta.momento,
            descripAndDate: {
                textArea: dataBoleta.indicadores_boleta.serYConvivir,
                inicioMomento: dataBoleta.inicio_momemnto,
                finMomento: dataBoleta.fin_momento,
                anioEscolar: dataBoleta.anio_escolar
            },
            studentSelected: {
                nombres: dataBoleta.nombre_estudiante,
                grado: dataBoleta.grado,
                seccion: dataBoleta.seccion,
                docente: dataBoleta.nombre_docente
            },
            personalFirmas: {
                directora: firmas.directora,
                coordinadora: firmas.coordinadora
            }
        }

        const { data } = await apiGenerarBoletaExistente(dataToGeneratePDF);
        downloandBoletaAndMsgSuccess(false, data, dataBoleta.nombre_estudiante);
        dispatch(limpiarDataBoleta());
    } catch (err) {
        console.log(err);
    }
}
