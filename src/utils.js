import { toast} from "react-toastify";

export const handleSuccess = (msg)=>{
    toast.success(msg,{
        position:'top-right',

    })

}
export const handleError = (msg)=>{
    toast.error(msg,{
        position:'top-left',
        icon: false, // Hides the default error icon if you don't need it
        style: {
            fontSize: "14px", // Adjust text size
            padding: "10px", // Add padding to make it look better
        },
    })
}