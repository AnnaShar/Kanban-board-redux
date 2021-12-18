import {toast} from 'react-toastify';
import './notifier.css';

export const showErrorMessage = (message) => {
    toast(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false
    });
}