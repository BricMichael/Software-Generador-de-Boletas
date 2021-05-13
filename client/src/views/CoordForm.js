import stylo from './coordForm.module.css';
import Header from "../components/Header";
import FooterForms from '../components/FooterForms';

const CoordForm = () => {
    return (
        <>
            <Header />
            <form className={ stylo.CoorForm }>
                <h1 className={ stylo.titleCoord }>Registro Coordinador(a)</h1>

                <div className={ stylo.content_inputs }>

                    <input type="text" name="nombre"  className={ stylo.coordInputs } id="nombre" placeholder="Nombre" required autoComplete="off" />

                    <input type="text" name="apellido"  className={ stylo.coordInputs } id="apellido" placeholder="Apellido" required />

                    <input type="text" name="cedula"  className={ stylo.coordInputs } id="cedula" placeholder="C&eacute;dula" required autoComplete="off" />

                    <input type="email" name="email"  className={ stylo.coordInputs } id="email" placeholder="Email" required autoComplete="off" />

                    <select name="coordinador" id="coordinador" required className={ stylo.coordOption }> 
                        <option value="default">Grupo de Coordinador</option>
                        <option value="Educacion Inicial">Educaci&oacute;n Inicial</option>
                        <option value="Primaria">Primaria</option>
                    </select>

                    <input type="text" name="telefono" className={ stylo.coordInputs } id="telefono" placeholder="Tel&eacute;fono" required autoComplete="off"/>

                    <input type="text" name="rif" className={ stylo.coordInputs } id="rif" placeholder="Rif" required autoComplete="off" />

                    <input type="password" name="clave" className={ stylo.coordInputs } id="clave" placeholder="Contraseña" required autoComplete="off" />

                    <input type="hidden" name="ocultar" id="ocultar" value="COORDINADOR" />
                </div>

                <FooterForms />
            </form>
        </>
    );
}

export default CoordForm;
