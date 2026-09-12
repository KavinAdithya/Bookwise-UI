import apiClient from "../../api/ApiClient";

export function registerAuthor(authorData) {
    return apiClient.post('/authors/register', authorData)
}

export function getAllAuthors() {
    return apiClient.get('/authors');
}

export function getAuthorById(authorId) {
    return apiClient.get(`/authors/${authorId}`);
}

export function approveAuthor(authorId) {
    return apiClient.patch(`/authors/approve`, { authorIds : [authorId] });
}

export function rejectAuthor(authorId) {
    return apiClient.patch(`/authors/reject`, { authorIds : [authorId] });
}