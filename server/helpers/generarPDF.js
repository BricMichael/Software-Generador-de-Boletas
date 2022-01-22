const puppeteer = require('puppeteer');
const pool = require('../configDB/poolConfig');;
const puppeterReport = require('puppeteer-report');


const generarPdfWithPuppeter = async (nameFilePDF) => {
    try {
        const options = {
            format: 'letter',
            path: `pdf/${nameFilePDF}boleta.pdf`,
            margin: { bottom: '12px', top: '6px' }
        };

        const naveg = await puppeteer.launch();
        const page = await naveg.newPage();
        await page.goto('http://localhost:4000/api/boleta/modelPDF');

        await puppeterReport.pdfPage(page, options);
        await naveg.close(); // A este punto el pdf ya ha sido generado. 
    } catch (err) {
        console.log('Error generarPdfWithPuppeter: ', err);
    }
}


const guardarDatosBoleta = async (datos) => {
    try {
        const { studentSelected, descripAndDate } = datos;

        const indicadoresBoleta = {
            docente: datos.indicadoresByArea,
            especialista: datos.literalesEspecialistas,
            serYConvivir: descripAndDate.textArea
        }

        const promisesQuerys = [pool.query(`INSERT INTO boleta( anio_escolar, grado, seccion, indicadores_boleta, momento, nombre_estudiante, nombre_docente, cedula_estudiante, inicio_momemnto, fin_momento, fecha_de_creacion ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [descripAndDate.anioEscolar, studentSelected.grado, studentSelected.seccion, indicadoresBoleta, datos.momento, studentSelected.nombres, studentSelected.docente, studentSelected.cedula_escolar, descripAndDate.inicioMomento, descripAndDate.finMomento, datos.fecha_de_creacion])
        ];

        if (datos.boletasPendientesBySeccion > 1) {
            const query = pool.query('UPDATE estudiante SET boleta_generada = $1 WHERE id = $2', ['Generada', studentSelected.id]);
            promisesQuerys.push(query);
        }

        if (datos.boletasPendientesBySeccion <= 1) {
            const query = pool.query(`UPDATE estudiante SET boleta_generada = $1 WHERE grado = $2 AND seccion = $3`,
                ['Pendiente', studentSelected.grado, studentSelected.seccion]);
            promisesQuerys.push(query);
        }

        await Promise.all(promisesQuerys);
    } catch (err) {
        console.log('guardarDatosBoleta: ', err);
    }
}


module.exports = {
    generarPdfWithPuppeter,
    guardarDatosBoleta
}

