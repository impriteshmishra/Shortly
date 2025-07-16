// Axios Instance that help us to centralise the base url.

import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:3500",
    timeout:10000, //10s  when not responding 10s meanst server time out
    withCredentials:true
})

export default axiosInstance;

// In future here I am gong to use the error handling for axiosInstance