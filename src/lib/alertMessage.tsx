import Swal from 'sweetalert2';



export const alertMessageWithLoading = (title: string, icon: "success" | "error" | "warning" | "info" | undefined, postLoadingFunc: Function | null) => {

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",

        showConfirmButton: false,
        timer: postLoadingFunc ? 9000 : 3000,
        timerProgressBar: postLoadingFunc ? false : true,


    });

    Toast.fire({
        icon: icon,
        title: title,
        didOpen: () => { postLoadingFunc && postLoadingFunc() }
    });

}



export const alertMessage = (title: string, icon: "success" | "error" | "warning" | "info",) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

    });

    Toast.fire({
        icon: icon,
        title: title,

    });
}




export const dialogFillAllFields = (title: string, text: string | undefined, icon: "success" | "error" | "warning" | "info") => {
    Swal.fire({
        title: title,
        text: text,
        showCancelButton: false,
        icon: icon,
        confirmButtonText: 'رجوع',
    })
}