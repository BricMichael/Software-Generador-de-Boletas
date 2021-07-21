
const materiaConIndicadores = (docenteMaterias, indicadoresOfMateria) => {
    const arrayMulti = []
    
    for( let area of docenteMaterias) {
        let soloAreas = area.materia
        arrayMulti.push([soloAreas])
    }
    for ( let indicador of indicadoresOfMateria ){
        if ( indicador.area === arrayMulti[0][0] ) arrayMulti[0].push( indicador.indicador )
        else if ( indicador.area  === arrayMulti[1][0] ) arrayMulti[1].push( indicador.indicador ) 
        else if ( indicador.area  === arrayMulti[2][0] ) arrayMulti[2].push( indicador.indicador )
        else if ( indicador.area  === arrayMulti[3][0] ) arrayMulti[3].push( indicador.indicador ) 
        else if ( indicador.area  === arrayMulti[4][0] ) arrayMulti[4].push( indicador.indicador )
        else if ( indicador.area  === arrayMulti[5][0] ) arrayMulti[5].push( indicador.indicador )
        else if ( indicador.area  === arrayMulti[6][0] ) arrayMulti[6].push( indicador.indicador ) 
        else if ( indicador.area  === arrayMulti[7][0] ) arrayMulti[7].push( indicador.indicador )
        else if ( indicador.area  === arrayMulti[8][0] ) arrayMulti[8].push( indicador.indicador )
        else if ( indicador.area  === arrayMulti[9][0] ) arrayMulti[9].push( indicador.indicador )
        else if ( indicador.area  === arrayMulti[10][0] ) arrayMulti[10].push( indicador.indicador )   
    }   
    return arrayMulti;
}

export default materiaConIndicadores;