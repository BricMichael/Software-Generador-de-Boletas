import { emailCorrecciones } from '../../api/api';
import { useForm } from '../../helpers/useForm';
import style from './comentarios.module.css';
import Swal from 'sweetalert2';

const ComentariosEmail = () => {
    const [ values, handleInputChange, reset ] = useForm({ comentario: '', emailDestinatario: '',});
    const { comentario, emailDestinatario } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        values.nameUser = JSON.parse( localStorage.getItem('userActive') ).nombre;
        
        if( emailDestinatario.length > 15 && emailDestinatario.split('').includes('@') ){
            emailCorrecciones( values );
            Swal.fire({ icon: 'success', title: 'El comentario ha sido enviado', showConfirmButton: false, timer: 1300 })
            reset();
        } else {
            Swal.fire({ icon: 'error', title: 'Correo electrónico inválido', showConfirmButton: false, timer: 1300 })
        }
    }    
        

    return (
        <form className={style.comentsForm} onSubmit={ handleSubmit }>
            <h3 className={style.comentsTitle}>Comentarios</h3>
            <textarea className={style.comentsObservaciones} 
                placeholder="Escribe aquí tu comentario" required
                name='comentario'
                value={ comentario }
                onChange={ handleInputChange }
            ></textarea>

            <input type="email" 
                placeholder="Correo del destinatario *"
                className={style.comentsCorreo}
                name='emailDestinatario'
                value={ emailDestinatario}
                onChange={ handleInputChange }
                autoComplete= 'off'
                required
            ></input>
            <button className={style.comentsEnviarBtn} type="submit">Enviar</button>
        </form>      
    );
}

export default ComentariosEmail;
