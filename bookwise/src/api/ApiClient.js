import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000
});

apiClient.interceptors.request.use(config => {

    const token =
        localStorage.getItem("token");

    if(config.url !== "/login" && token) {

        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

// apiClient.interceptors.response.use(

//     response => response,

//     error => {
//         if(error.code === "ERR_NETWORK") {

//             alert(
//                 "Backend Server is unavailable"
//             );
//         } else if(error.code === "ECONNABORTED") {

//             alert(
//                 "Server is taking too long to respond"
//             );

//         } else if(error.response?.status === 401) {

//             console.log(
//                 "Unauthorized - Logging Out"
//             );

//             localStorage.clear();

//             window.location.href =
//                 "/login";
//         }

//         return Promise.reject(error);
//     }
// );

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response) {

            const status = error.response.status;
            const message = error.response.data?.message;

            console.log("Backend error:", status, message);

            alert(message || "Something went wrong");

        } else {
            alert("Unable to connect to server");
        }

        return Promise.reject(error);
    }
);

export default apiClient;