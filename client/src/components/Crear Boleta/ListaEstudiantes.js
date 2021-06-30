import style from '../../views/Sistema/Boletas/crearBoleta.module.css';

const ListaEstudiantes = ({num = 1, grado, alumno, nombre}) => {

    let arrays = [{nombre: "Mario Jose Ramirez Augusto", grado: "3ero", seccion: "C"},
    {nombre: "Juan Andres Godoy Flores", grado: "3ero", seccion: "C"},
    {nombre: "Ginet Sofia Ramirez Uzcategui", grado: "3ero", seccion: "C"},
    {nombre: "Luis Daniel Perdomo Cegarra", grado: "3ero", seccion: "C"},
    {nombre: "Pablo Jose Godoy Palacios", grado: "3ero", seccion: "C"}
    ];


    return (
        <div className={style.listaEstudiantes}>
            <h3>Lista de estudiantes</h3>
            <table className={ style.table}>  
                <thead>
                    <tr className={ style.tableTr}>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Grado</th>
                        <th>Secci&oacute;n</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       arrays.map( alumno => (
                        <tr key={alumno.nombre} className={style.listaFiveFlex}>
                            <td className={style.indicee}>#{num++}</td>
                            <td className={ style.borderRadius }>{ alumno.nombre }</td>
                            <td className={ style.borderRadius }>{ alumno.grado }</td>
                            <td className={ style.borderRadius }>{ alumno.seccion }</td>
                        </tr>
                       ))
                   }
                </tbody>
            </table>
            <button type="submit">Siguientes alumnos</button>

            {/* <div className={ style.contentList }>
                <h3>Lista de estudiantes</h3>

                <div className={ style.listaEstudiantes}> 
                    <div className={`${style.listaFiveFlex} ${style.indice}`}>
                        <h4>#</h4>
                    </div>
                    <div className={ style.listaFiveFlex}>
                        <h4>Nombre:</h4>
                    </div>
                    <div className={ style.listaFiveFlex}>
                        <h4>Grado:</h4>
                    </div>
                    <div className={ style.listaFiveFlex}>
                        <h4>Secci&oacute;n:</h4>
                    </div>   
                </div>     */}
{/* 
                {   arrays.map( alumno => (      
                        <div className={ style.listaEstudiantes}> 
                            <div className={`${style.listaFiveFlex} ${style.indice}`}>
                                <h4>#</h4>
                                 <p><b>{num++}</b></p>
                            </div>
                            <div className={ style.listaFiveFlex}>
                                <p>{alumno.nombre}</p>
                            </div>
                            <div className={ style.listaFiveFlex}>
                                <p>{alumno.grado}</p>
                            </div>
                            <div className={ style.listaFiveFlex}>                   
                                <p>{alumno.seccion}</p>
                            </div>   
                        </div>           
                    ))
                } */}
                {/* <button type="submit">Siguientes alumnos</button> */}
            {/* </div> */}
        </div>
    );
}

export default ListaEstudiantes;
