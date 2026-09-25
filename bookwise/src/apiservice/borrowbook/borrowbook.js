import apiClient from '../../api/ApiClient'

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