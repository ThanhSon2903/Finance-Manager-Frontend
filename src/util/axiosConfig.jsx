import axios from "axios";


const axiosConfig = axios.create({

    //địa chỉ đường dẫn của phía backend khi deloy
    baseURL: "https://build-money-manager-web.onrender.com/api/v1.0",
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

//Những endpoint sẽ được mở
const publicEndpoints = ["/login","/register","/status","/activate","/health"];


//Yêu cầu chặn những request
axiosConfig.interceptors.request.use((config) =>{
    const shouldSkipToken = publicEndpoints.some((endPoint) => {
        config.url.includes(endPoint)
    });
    if(!shouldSkipToken){
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
},(error) => {
    return Promise.reject(error);
})


//Yêu cầu chặn những response
axiosConfig.interceptors.response.use((response) => {
    return response;
},(error) => {
    if(error.response){
        if(error.response.status == 401){
            window.location.href = "/login";
        }
        else if(error.response.status == 500){
            console.error("Server error. Please try again later");
        }
    }
    else if(error.code == "ECONNABORTED"){
        console.log("Request timeout. Please try again. ");
    }
    return Promise.reject(error);
})

export default axiosConfig;