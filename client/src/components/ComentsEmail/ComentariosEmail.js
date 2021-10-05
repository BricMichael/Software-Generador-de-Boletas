import { emailCorrecciones } from '../../api/api';
import { useForm } from '../../helpers/useForm';
import style from './comentarios.module.css';
import { alertErrors, alertSuccess } from '../../helpers/alerts';

const ComentariosEmail = () => {
    const [values, handleInputChange, reset] = useForm({ comentario: '', emailDestinatario: '', });
    const { comentario, emailDestinatario } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        values.nameUser = JSON.parse(localStorage.getItem('userActive')).nombre;

        if (emailDestinatario.length > 15 && emailDestinatario.split('').includes('@')) {
            emailCorrecciones(values);
            alertSuccess('El comentario ha sido enviado', 'center');
            reset();
        }
        else alertErrors('Correo electrónico inválido', '#012c66');
    }


    return (
        <form className={style.comentsForm} onSubmit={handleSubmit}>
            <h3 className={style.comentsTitle}>Comentarios</h3>
            <textarea className={style.comentsObservaciones}
                placeholder="Escribe aquí tu comentario" required
                name='comentario'
                value={comentario}
                onChange={handleInputChange}
            ></textarea>

            <input type="email"
                placeholder="Correo del destinatario *"
                className={style.comentsCorreo}
                name='emailDestinatario'
                value={emailDestinatario}
                onChange={handleInputChange}
                autoComplete='off'
                required
            ></input>
            <button className={style.comentsEnviarBtn} type="submit">Enviar</button>
        </form>
    );
}

export default ComentariosEmail;
