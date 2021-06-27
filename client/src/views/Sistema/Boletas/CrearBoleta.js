import { backgroundColorPage } from '../../../helpers/coloresBG';
import style from './crearBoleta.module.css'


const CrearBoleta = ({num = 1}) => {
    backgroundColorPage('#012c66');

    let arrays = [{nombre: "Mario Jose Ramirez Augusto", grado: "3ero", seccion: "C"},
        {nombre: "Juan Andres Godoy Flores", grado: "3ero", seccion: "C"},
        {nombre: "Ginet Sofia Ramirez Uzcategui", grado: "3ero", seccion: "C"},
        {nombre: "Luis Daniel Perdomo Cegarra", grado: "3ero", seccion: "C"},
        {nombre: "Pablo Jose Godoy Palacios", grado: "3ero", seccion: "C"}
    ]

    return (
        <div className={ style.generales }>
            <h1 className={ style.nooo }>Creación de boleta</h1>

            <form className={style.contentForm}>

                    <label className={ style.searchStudents}>Buscar estudiantes</label>

                    <div className={style.formFlex}>
                        <select required className={style.buscarOptions} >
                            <option value="default">Grado</option>
                            <option value="Preescolar">Preescolar</option>
                            <optgroup label="Primaria">
                                <option value="1ero">1er Grado</option>
                                <option value="2do">2do Grado</option>
                                <option value="3ero">3er Grado</option>
                                <option value="4to">4to Grado</option>
                                <option value="5to">5to Grado</option>
                                <option value="6to">6to Grado</option>
                            </optgroup>
                        </select>

                        <select className={style.buscarOptions} >
                            <option>Sección</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                        </select>
                    </div>
                    <input value="Buscar estudiantes" type="submit" className={style.submit} />
            </form>        

           <div className={ style.contentList }>
               <h3>Lista de estudiantes</h3>
                {
                    arrays.map( alumno => (
                        <div className={ style.listaEstudiantes}> 
                            <div className={`${style.listaFiveFlex} ${style.indice}`}>
                                <h4>#</h4>
                                <p><b>{num++}</b></p>
                            </div>
                            <div className={ style.listaFiveFlex}>
                                <h4>Nombre:</h4>
                                <p>{alumno.nombre}</p>
                            </div>
                            <div className={ style.listaFiveFlex}>
                                <h4>Grado:</h4>
                                <p>{alumno.grado}</p>
                            </div>
                            <div className={ style.listaFiveFlex}>
                                <h4>Secci&oacute;n:</h4>
                                <p>{alumno.seccion}</p>
                            </div>   
                        </div>
                    ))
                }
                <button type="submit">Siguientes alumnos</button>
           </div>

         
            <div className={ style.display }>
                <form className={ style.contentForm }>
                    <div className={ style.group }>
                        <label>Estudiante</label>
                        <input placeholder="Nombre del estudiante" type="text" className={style.Cboleta_input} 
                        />
                    </div>
                    <div className={ style.group }>    
                        <label>Grado</label>
                        <input placeholder="Grado" type="text" className={style.Cboleta_input} 
                        />
                    </div>  
                    <div className={ style.group }>                   
                        <label>Secci&oacute;n</label>
                        <input placeholder="Sección" type="text" className={style.Cboleta_input} 
                        />
                    </div>
                    <div className={ style.group }>     
                        <label>Docente</label>
                        <input placeholder="Docente" type="text" className={style.Cboleta_input} 
                        />
                    </div>
                    <div className={ style.group }>     
                        <label>Ser y convivir</label>
                        <textarea placeholder="Descripción SER Y CONVIVIR..."></textarea>
                    </div>    
                </form>
                <div className={ style.zoneRight }>
                <h2>Indicadores</h2>
                    <div className={ style.contentIndicadores }>
                        <div className={ style.leyendaFlex }>
                            <h3 className={ style.leyendaTitulos }>Leyenda:</h3>
                            <p className={ style.leyendaTitulos }><b>E:</b> Exelente</p>
                            <p className={ style.leyendaTitulos }><b>B:</b> Bien</p>
                            <p className={ style.leyendaTitulos }><b>RN:</b> Requiere nivelaci&oacute;n</p>
                        </div>
                        <div className={ style.cabeceraIndicadores }>
                            <h4 className={ style.materia }>Área: Lengua y literatura</h4>
                            <h4>E</h4>
                            <h4>B</h4>
                            <h4>RN</h4>
                  
                            <div className={ style.descripIndicador } >
                                <p>Identificó de manera acorde los signos de puntuación tales como: el punto, los dos puntos, la coma, las
                                        comillas, signos de interrogación, signos de admiración.
                                        Comprendió y estableció comparaciones entre la silaba tónica.
                                </p>
                            </div>
                            <div className={ style.backColor } ><input name="literal" type="radio" value="E"  className={ style.checkbox} /></div>
                            <div className={ style.backColor } ><input  name="literal" type="radio" value="B"  className={ style.checkbox} /></div>
                            <div className={ style.backColor } ><input  name="literal" type="radio" value="RN"  className={ style.checkbox} /></div>                
                        </div>

                            {/* area matematica */}
                        <div className={ style.cabeceraIndicadores }>
                            <h4 className={ style.materia }>Área: Matemática</h4>
                            <h4>E</h4>
                            <h4>B</h4>
                            <h4>RN</h4>
                  
                            <div className={ style.descripIndicador } >
                                <p>Por medio de explicaciones utilizó el método apropiado, según sea el caso en divisiones de 
                                    números con decimales. 
                                </p>
                            </div>
                            <div className={ style.backColor } ><input name="literal2" type="radio" value="E"  className={ style.checkbox} /></div>
                            <div className={ style.backColor } ><input  name="literal2" type="radio" value="B"  className={ style.checkbox} /></div>
                            <div className={ style.backColor } ><input  name="literal2" type="radio" value="RN"  className={ style.checkbox} /></div>                
                        </div>

                        <div className={ style.cabeceraIndicadores }>
                            <h4 className={ style.materia }>Experimento cient&iacute;fico</h4>
                            <h4>E</h4>
                            <h4>B</h4>
                            <h4>RN</h4>
                  
                            <div className={ style.descripIndicador } >
                                <p>Elaboró un collage en la presentación de experimento científico.</p>
                            </div>
                            <div className={ style.backColor } ><input name="literal3" type="radio" value="E"  className={ style.checkbox} /></div>
                            <div className={ style.backColor } ><input  name="literal3" type="radio" value="B"  className={ style.checkbox} /></div>
                            <div className={ style.backColor } ><input  name="literal3" type="radio" value="RN"  className={ style.checkbox} /></div>                
                        </div>
                    </div>        
                </div>      
            </div>
            
        </div>
    )
}

export default CrearBoleta;
