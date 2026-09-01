import apiClient from "../../api/ApiClient";

export function registerUser(userData) {
    return apiClient
                .post(
                    "/users/register",
                    userData
                )
}