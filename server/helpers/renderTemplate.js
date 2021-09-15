const hbs = require('handlebars');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const puppeteerReport = require('puppeteer-report');


const renderTemplate =(data) => {
    // const html = fs.readFileSync( path.join(__dirname, `../views/main.hbs`), { encoding : 'utf-8' } );
    // console.log(data)
    // const plantilla = hbs.compile(html);

    // const rendered = plantilla(data);

    path.join(__dirname, `../views/main.hbs`)

    return rendered;
}

const createdPDF = async(htmlContent, nameAlumno) =>{
    try {
       
    const navegador =  await puppeteer.launch();
    const page = await navegador.newPage();

    const options = { 
        format: 'letter',
        path: `pdf/Boleta${nameAlumno}.pdf`,
        margin: { bottom: '15px', top: '6px' } 
    }

    await page.setContent(htmlContent, options);

    // const options = { 
    //     format: 'letter',
    //     path: `pdf/Boleta${nameAlumno}.pdf`,
    //     margin: { bottom: '15px', top: '6px' } 
    // }

    await puppeteerReport.pdf(navegador, htmlContent, options);
    await page.pdf(options);

    await navegador.close();
    } catch (e) {
        console.log(e.message);
    }
}

const prueba = (nombre= '') => {
    return  {
            nombre: nombre,
            valor: false,
            alumno:'Michael Jose Felipe Gutierrez'
        }
}

module.exports = {
    renderTemplate,
    createdPDF,
    prueba
}