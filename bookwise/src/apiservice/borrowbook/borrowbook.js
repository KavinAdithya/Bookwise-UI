import apiClient from "../../api/apiClient"

export function fetchBorrowBookConfirmationDetails(bookId, quantity) {
    return apiClient.get(`/borrow-books/confirmation/${bookId}/${quantity}`)
}

export function registerBorrowBook(body) {
    return apiClient.post(`/borrow-books/register`, body)
}

export function fetchMyBorrowedBooks() {
    return apiClient.get("/borrow-books")
}

export function fetchReturnBookDetails(borrowBookId) {
    return apiClient.get(`/borrow-books/${borrowBookId}/return/details`)
}

export function returnBorrowBook(data) {
    return apiClient.patch(`/borrow-books/return-book`, data)
}

export function getBorrowDetails(borrowBookId) {
    return apiClient.get(`/borrow-books/${borrowBookId}`)
} 