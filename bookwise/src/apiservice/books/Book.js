import apiClient from "../../api/apiClient";

export function registerBook(formData) {
    return apiClient
        .post("/books/register", formData);
}

export function fetchAllAuthorBooks() {
    return apiClient.get("/books/author");
}

export function fetchBook(id) {
    return apiClient.get(`/books/author/book/${id}`)
}

export function fetchAllBooksByStatusForAdmin(bookStatus) {
    return apiClient
                .get(`/books/admin/books`, {
                    params: {
                        'bookStatus' : bookStatus
                    }
                })
}

export function getBookByIdForAdmin(bookId) {
    return apiClient
                .get(`/books/admin/book/${bookId}`)
}

export function approveBooks(requestBody) {
    return apiClient
                .patch(`/books/approve`, requestBody)
}

export function rejectBooks(requestBody) {
    return apiClient
                .patch(`/books/reject`, requestBody)
}

export function fetchAllBooks() {
    return apiClient
                .get('/books')
}