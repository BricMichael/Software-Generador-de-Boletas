import styles from '../../views/Sistema/Dashboard/dashboard.module.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { links } from '../../helpers/coloresBG';


const DashBody = () => {
    const nombreUser  = JSON.parse(window.localStorage.getItem('userActive')) // data formateada a json

    return (
        <>
        <main className={ styles.main_container }>
            <Header color='#2255a4' />
            <section className={styles.accesos}>
                <div className={styles.all_links}>

                    {
                        links.map( enlace =>(
                            <Link to={ enlace.to } key={enlace.styleIcon}
                            className={enlace.className}>
                                <i className={ enlace.styleIcon }></i>
                                <p className={enlace.pStyle}>{enlace.p}</p>
                            </Link>  
                        ))
                    }    
            
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
