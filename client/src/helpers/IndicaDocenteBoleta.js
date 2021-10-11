
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
