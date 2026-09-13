import apiClient from "../../api/apiClient";

export function registerBook(formData) {
    return apiClient
        .post("/books/register", formData);
}

export function fetchAllAuthorBooks() {
    return apiClient.get("/books/author");
}