import apiClient from "../../api/apiClient";

export function registerBook(formData) {
    return apiClient
        .post("/books/register", formData);
}

export function fetchAllAuthorBooks() {
    return apiClient.get("/author/me/books");
}

export function fetchBook(id) {
    return apiClient.get(`/author/me/books/${id}`)
}

export function fetchAllBooksByStatusForAdmin(bookStatus) {
    return apiClient
                .get(`/admin/me/books`, {
                    params: {
                        'bookStatus' : bookStatus
                    }
                })
}

export function getBookByIdForAdmin(bookId) {
    return apiClient
                .get(`/admin/me/books/${bookId}`)
}

export function approveBooks(requestBody) {
    return apiClient
                .patch(`/admin/books/approve`, requestBody)
}

export function rejectBooks(requestBody) {
    return apiClient
                .patch(`/admin/books/reject`, requestBody)
}

export function fetchAllBooks() {
    return apiClient
                .get('/books')
}

export function fetchBookDetail(bookId) {
    return apiClient
                .get(`/books/${bookId}`)
}