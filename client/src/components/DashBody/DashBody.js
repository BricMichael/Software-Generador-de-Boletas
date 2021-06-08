import styles from '../../views/Sistema/Dashboard/dashboard.module.css';
import clogo from '../../assets/img/colegioLogo.png';
// import { useSelector } from 'react-redux'



const DashBody = () => {
    const nombreUser  = JSON.parse(window.localStorage.getItem('userActive')) // data formateada a json

    return (
        <>
        <main className={ styles.main_container }>
            <div className={styles.menu_cabecera}>
                <img src={ clogo } className={styles.header_img} alt='logo de la institucion' />
                <p className={styles.header_title}>Colegio Rep&uacute;blica de Venezuela</p>
            </div>
            <section className={styles.accesos}>
                <div className={styles.all_links}>
                    <div className={`${styles.cl_azul} ${styles.grupo}`}>
                        <i className={`${styles.bg} far fa-address-book`}></i>
                        <a href="#" className={styles.opciones}> Indicadores</a>
                    </div>

                    <div className={`${styles.cl_verde} ${styles.grupo}`}>           
                        <i className={`${styles.bg} fas fa-file-alt`}></i>
                        <a href="#" className={styles.opciones}> Crear Boleta</a>                  
                    </div>

                    <div className={`${styles.cl_amarillo} ${styles.grupo}`}>
                        <i className={`${styles.bg} fas fa-pen-alt`}></i>
                        <a href="#" className={styles.opciones}> Editor de Boletas</a>            
                    </div>

                    <div className={`${styles.cl_naranja} ${styles.grupo}`}>
                        <i className={`${styles.bg} far fa-newspaper`}></i>
                        <a href="#" className={styles.opciones}> Revisar Boleta</a>       
                    </div>

                    <div className={`${styles.cl_azulOscuro} ${styles.grupo}`}>            
                        <i className={`${styles.bg} fas fa-print`}></i>
                        <a href="#" className={styles.opciones}> Zona de Descargas</a>
                    </div>

                    <div className={`${styles.cl_naranja} ${styles.grupo}`}> 
                        <i className={`${styles.bg} fas fa-users`}></i>
                        <a href="#" className={styles.opciones}>Usuarios</a>
                    </div>
                    <div className={styles.user}>
                        <p>{`Usuario: ${ nombreUser ? nombreUser.nombre : '' }`}</p>
                    </div>     
                </div>
            </section>
        </main>
        </>
    )
}

export default DashBody;
