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
        position: position,
        icon: 'success',
        text: msg,
        showConfirmButton: false,
        timer: 1300
    })
}

export const alertErrors = (msg, color = '#538fca') => {
    Swal.fire({
        icon: 'error',
        title: 'Datos incorrectos',
        confirmButtonColor: color,
        text: msg,
        width: '440px',
    })
}

