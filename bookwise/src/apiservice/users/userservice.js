import apiClient from "../../api/ApiClient";

export function registerUser(userData) {
    return apiClient
                .post(
                    "/users/register",
                    userData
                )
}

export function authenitcateUser(userCredential) {
    return apiClient.post("/users/login", userCredential)
}

export function getCurrentUserDetails() {
    return apiClient.get("/users/me");
}