import apiClient from "../../api/ApiClient";

export function registerAuthor(authorData) {
    return apiClient.post('/authors/register', authorData)
}
