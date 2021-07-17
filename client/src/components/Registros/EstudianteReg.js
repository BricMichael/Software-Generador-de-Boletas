import style from '../../views/Sistema/Usuarios/registrosUsers.module.css'



const EstudianteReg = () => {
    return (
        <form className={style.estudianteRegForm} onSubmit="">
            <h3 className={style.titleRegisters}>Registro de Estudiante</h3>
                    
            <input type="text" className={style.registerInputs} 
            autoComplete="off" placeholder="Nombre Completo" 
            name="name"
             />

            <input type="text" className={style.registerInputs} 
            placeholder="Cédula escolar" name="password" />

            <select className={ style.optionsRegister } >
                <option>G&eacute;nero</option>
                <option value="F">F</option>
                <option value="M">M</option>     
            </select>

            <select className={ style.optionsRegister } >
                <option>Grado</option>
                <option value="1">Primer grado</option>
                <option value="2">Segundo grado</option>  
                <option value="3">Tercer grado</option>
                <option value="4">Cuarto grado</option> 
                <option value="5">Quinto grado</option>
                <option value="6">Sexto grado</option>    
            </select>

            <select className={ style.optionsRegister } >
                <option>Seccion</option>
                <option value="A">A</option>
                <option value="B">B</option>  
                <option value="C">C</option>
                <option value="D">D</option> 
                <option value="E">E</option> 
            </select>

            <button type="submit" className={style.registerbuton}>
                Registrar Estudiante
            </button>

         </form>   
    )
}

export default EstudianteReg;
