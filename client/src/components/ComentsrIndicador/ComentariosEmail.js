import style from './comentarios.module.css';

const ComentariosEmail = () => {
    
    return (
        <form className={style.comentsForm}>
            <h3 className={style.comentsTitle}>Comentarios</h3>
            <textarea className={style.comentsObservaciones} 
                placeholder="Escribe aquí tu comentario" required
            ></textarea>
            <input type="email" 
                placeholder="Correo del destinatario *"
                className={style.comentsCorreo}
                required
            ></input>
            <button className={style.comentsEnviarBtn} type="submit">Enviar</button>
        </form>      
    );
}

export default ComentariosEmail;
