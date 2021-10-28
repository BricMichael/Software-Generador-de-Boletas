import { boletaGeneradaAlert } from "./alerts";
import { saveAs } from 'file-saver';

const materiaConIndicadores = (materias, indicadoresOfMateria, component) => {
    // componente == 'Cuerpo Boleta' || 'Lista Indicadores'
    const arrayMulti = materias.map(area => ({ area: area.materia, indicadores: [] }));

    for (let item of indicadoresOfMateria) {

        for (let value of arrayMulti) {
            if (item.area === value.area) {
                component === 'Cuerpo Boleta'
                    ? value.indicadores.push({ id: item.id, indicador: item.indicador, literal: item.literal })
                    : value.indicadores.push(item);
            }
        }
    }
    return arrayMulti;
}

export default materiaConIndicadores;



export const downloandBoletaAndMsgSuccess = (checkBoletasBySeccion, data, nameStudentBoleta) => {
    //checkBoletasBySeccion variable booleana. Total de estudiantes pendientes por boleta <= 1 ?
    // O si esta funcion la usa el metodo <generarBoletaExistente> le pasará siempre false.
    const msgBoletasCompletedBySection = `Todos tus estudiantes tienen la boleta de clasificación 'Completada', por ende serán actualizados a "Pendiente" para el proximo Momento.`;
    const msgBoletaCreated = checkBoletasBySeccion
        ? 'La boleta fue generada exitosamente, continúa con el siguiente alumno.' // boleta creada por primera vez
        : 'La boleta fue generada exitosamente'  // boleta generada despues de semanas, meses o años.

    boletaGeneradaAlert(checkBoletasBySeccion ? msgBoletasCompletedBySection : msgBoletaCreated, checkBoletasBySeccion);

    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    saveAs(pdfBlob, `${nameStudentBoleta}boleta`);
}