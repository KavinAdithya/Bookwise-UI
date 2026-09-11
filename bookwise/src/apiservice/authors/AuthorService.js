import apiClient from "../../api/ApiClient";

export function registerAuthor(authorData) {
    return apiClient.post('/authors/register', authorData)
}

export function getAllAuthors() {
    return apiClient.get('/authors');
}