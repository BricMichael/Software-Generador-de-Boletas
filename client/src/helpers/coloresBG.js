import styles from '../views/Sistema/Dashboard/dashboard.module.css';

export const backgroundColorPage = (color) => {
    let body = document.querySelector('body');
    body.style.backgroundColor = color;
}

export const links = [
    {
        to: '/menu-indicadores',
        className: `${styles.cl_azul} ${styles.grupo}`,
        styleIcon: `${styles.bg} far fa-address-book`,
        p: 'Indicadores',
        pStyle: styles.opciones
    },
    {
        to: '/menu-principal/creacion-de-boletas',
        className: `${styles.cl_verde} ${styles.grupo}`,
        styleIcon: `${styles.bg} fas fa-file-alt bg`,
        p: 'Crear Boleta',
        pStyle: styles.opciones
    },
    {
        to: '/menu-principal/registros',
        className: `${styles.cl_amarillo} ${styles.grupo}`,
        styleIcon: `${styles.bg} fas fa-tools`,
        p: 'Configuración',
        pStyle: styles.opciones
    },
    {
        to: '/menu-principal/descargar-boleta',
        className: `${styles.cl_azulOscuro} ${styles.grupo}`,
        styleIcon: `${styles.bg} fas fa-print`,
        p: 'Zona de Descargas',
        pStyle: styles.opciones
    }
]

export const showMenuByRol = ( rol ) => {
    if( rol === 'docente' ) return [links[0], links[1], links[2]];
    if ( rol === 'especialista' ) return [links[0], links[1]];
    return links;
}