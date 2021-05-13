import Header from '../components/Header'
import stylo from './docenteForm.module.css';
import FooterForms from '../components/FooterForms';

const DocenteForm = () => {
    return (
        <>
            <Header />
            <form  className={ stylo.formDocente }>

                <h1 className={ stylo.titleDocente }>Registro Docente</h1>

                <div className={ stylo.contentt_cajasText }>

                    <input type="text" className={stylo.docente_datos} name="nombre" id="nombre" placeholder="Nombre" required autoComplete="off" />

                    <input type="text" className={stylo.docente_datos} name="apellido" id="apellido" placeholder="Apellido" required />

                    <input type="text" className={stylo.docente_datos} name="cedula" id="cedula" placeholder="C&eacute;dula" required autoComplete="off" />

                    <input type="email" className={stylo.docente_datos} name="email" id="email" placeholder="Email" required autoComplete="off" />

                    <select name="nivelEducacion" id="nivelEducacion" required className={stylo.opciones}>
                        <option value="default">Nivel de Educaci&oacute;n</option>
                        <option value="Educacion Incial">Educacion Inicial</option>
                        <option value="Primaria">Primaria</option>
                    </select>

                    <select name="seccion" id="seccion" required className={stylo.opciones}> 
                        <option value="default">Secci&oacute;n</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>

                    <select name="grado" id="grado" required className={stylo.opciones}>
                        <option value="default">¿Grado?</option>
                        <option value="Preescolar">Preescolar</option>
                        <optgroup label="Primaria">
                            <option value="1er Grado">1er Grado</option>
                            <option value="2do Grado">2do Grado</option>
                            <option value="3er Grado">3er Grado</option>
                            <option value="4to Grado">4to Grado</option>
                            <option value="5to Grado">5to Grado</option>
                            <option value="6to Grado">6to Grado</option>
                        </optgroup>
                    </select>

                    <input type="text" className={stylo.docente_datos} name="telefono" id="telefono" placeholder="Tel&eacute;fono" required autoComplete="off" />

                    <input type="text" className={stylo.docente_datos} name="rif" id="rif" placeholder="Rif" required autoComplete="off" />

                    <input type="password" className={stylo.docente_datos} name="clave" id="clave" placeholder="Contraseña" required autoComplete="off" />

                    <input type="hidden" name="ocultar" id="ocultar" value="DOCENTE" />
                </div>

                <FooterForms />
            </form>
        </>
    )
}

export default DocenteForm;
