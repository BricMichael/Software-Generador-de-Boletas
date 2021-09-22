
const materiaConIndicadores = (materiasTypeDocente, indicadoresOfMateria) => {
  
    const arrayMulti = materiasTypeDocente.map( area => ({ area: area.materia, indicadores: [] }) );
 
    for ( let item of indicadoresOfMateria ){

        for (let value of arrayMulti) {
            if ( item.area === value.area ){
                value.indicadores.push( { id: item.id, indicador: item.indicador } )
            }
        }
    }   

    return arrayMulti;
}

export default materiaConIndicadores;
