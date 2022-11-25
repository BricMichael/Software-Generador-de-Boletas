import { apiGenerarBoletaExistente, apiGetBoletaByCedulaAndMomento } from "../../api/api"
import { alertAvisos, BoletaEnProcesoAlert } from "../../helpers/alerts";
import { downloandBoletaAndMsgSuccess } from "../../helpers/creacionBoleta";
import types from "../types";

export const getDataBoletaByStudent = (datos, resetState, setLoading) => async (dispatch) => {
    try {
        const { data } = await apiGetBoletaByCedulaAndMomento(datos);
        setLoading(false);

        dispatch({
            type: types.dataBoletaByStudent, 
            payload: data.datos
        })
        
        if (data.datos.length) resetState();
        else {
            resetState(datos); // si no hay data, dejar los campos del formulario igual.
            alertAvisos('No se han encontrado resultados');
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
