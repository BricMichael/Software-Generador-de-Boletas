export const handleAreaSelected = (targetInput, allData, materias, handleMaterias, setHandleMaterias, setMsgData) => {
    const areaFiltrada = allData.find(type => type.area === targetInput.value);

    if (!areaFiltrada) {
        setMsgData(`*Sin indicadores en el área: ${targetInput.value}*`);

        setTimeout(() => {
            setMsgData('Mostrando por el área:');
        }, 3800);
    } else {
        const indiceMateria = materias.map(item => item.materia).indexOf(targetInput.value);
        const checkIndice = indiceMateria + 1 > allData.length;

        const dataSelected = areaFiltrada.indicadores;
        setHandleMaterias({ ...handleMaterias, dataSelected, indice: checkIndice ? indiceMateria : indiceMateria + 1 });
    }
}


const primerItem = (setHandleMaterias, result, nameUserRef, nameUser) => {
    setHandleMaterias({// esta sirve para docentes, espcecialistas y coordinador
        allData: result,
        dataSelected: result[0].indicadores,
        indice: 1
    })
    nameUserRef.current = nameUser;
}

export const validacionUseEffect = (momentoRef, nameUserRef, momentoState, nameUser, setHandleMaterias, result, indice) => {
    const checkMomento = momentoRef.current === momentoState;
    const checkNameUser = nameUserRef.current === nameUser;

    // Coordinador, si el usuario es diferente mostrar la posicion 0 de la nueva data. 
    if (checkMomento && !checkNameUser) primerItem(setHandleMaterias, result, nameUserRef, nameUser);

    else if (!checkMomento) { // momento diferente, mostrar el item 0 de la nueva data.
        primerItem(setHandleMaterias, result, nameUserRef, nameUser);
        momentoRef.current = momentoState;
    }
    else { //quedarse en la misma area donde hayan habido modificaciones.
        const checkPosition = result[indice - 1]?.indicadores;
        setHandleMaterias({
            allData: result,
            dataSelected: !checkPosition ? result[0].indicadores : checkPosition,
            indice: !checkPosition ? 1 : indice
        })
    }
}
// else => un especialista solo da una area, por ende indice 0
// si accede a su area por el menu el indice cambiará
// el acceso a una propiedad de ese indice dará error, por eso mostrar la posicion 0.
// en caso de ser docente se muestra la propiedad del indice que se este accediendo.