import Header from "../components/Header";
import FooterForms from "../components/FooterForms";
import style from "./depEvaluacion.module.css"


const DepEvaluacionForm = () => {
    return (
        <>
            <Header />
            <form className={ style.evaluacionForm } >
                <h1 className={ style.titleDepartamento }>Registro Departamento de Evaluaci&oacute;n</h1>
                <div className={ style.cont_general }>

                    <input type="text" name="nombre" id="nombre" className={ style.depDatos } placeholder="Nombre" required autoComplete="off" />

                    <input type="text" name="cedula" id="cedula"  className={ style.depDatos } placeholder="C&eacute;dula" required autoComplete="off" />
                    
                    <input type="text" name="apellido" id="apellido" className={ style.depDatos } placeholder="Apellido" required />

                    <input type="email" name="email" id="email" className={ style.depDatos } placeholder="Email" required autoComplete="off" />

                    <select name="nivelAdmin" id="nivelAdmin" required className={ style.dep_option}>
                        <option value="default">Nivel de Administraci&oacute;n</option>
                        <option value="Educ. Inicial">Educaci&oacute;n Inicial</option>
                        <option value="Primaria">Primaria</option>
                    </select>

                    <input type="text" name="telefono" id="telefono" className={ style.depDatos } placeholder="Tel&eacute;fono" required autoComplete="off" />

                    <input type="text" name="rif" id="rif" className={ style.depDatos } placeholder="Rif" required autoComplete="off"/>

                    <input type="password" name="clave" id="clave" className={ style.depDatos } placeholder="Contraseña" required autoComplete="off" />

                    <input type="hidden" name="ocultar" id="ocultar" value="DepEVALUACION" />
                </div>
                <FooterForms />
            </form>
        </>
    );
}

export default DepEvaluacionForm;
