import Swal from 'sweetalert2';


export const alertDeleteItems = async (msgTitle) => {
    const { isConfirmed } = await Swal.fire({
        title: "¡No podrás revertir esto!",
        text: msgTitle,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar',
        width: '455px',
    })

    if (isConfirmed) return true;
    else return false;
}

export const alertSuccess = (msg, position = 'top-end') => {
    Swal.fire({
        position,
        icon: 'success',
        text: msg,
        showConfirmButton: false,
        timer: 1300
    })
}

export const alertErrors = (msg, color = '#538fca', title = 'Datos incorrectos') => {
    Swal.fire({
        icon: 'error',
        title,
        confirmButtonColor: color,
        text: msg,
        width: '440px',
    })
}

export const alertAvisos = (msg) => {
    Swal.fire({
        html: msg,
        icon: 'info',
        width: '440px',
        confirmButtonColor: '#4169e1',
    })
}

export const BoletaEnProcesoAlert = () => {
    Swal.fire({
        title: 'Generando Boleta',
        html: 'La boleta se está generando, por favor espere un momento...',
        timerProgressBar: true,
        didOpen: () => Swal.showLoading()
    })
}

export const boletaGeneradaAlert = (msgSucces, boletasPendientesByGrado) => {
    Swal.fire({
        title: 'Boleta generada',
        icon: 'success',
        html: msgSucces,
        confirmButtonColor: '#4169e1',
        confirmButtonText: boletasPendientesByGrado ? 'Entendido' : 'Continuar',
    })
}
