import apiClient from '../../api/ApiClient'

export function fetchBorrowBookConfirmationDetails(bookId, quantity) {
    return apiClient.get(`/borrow-books/confirmation/${bookId}/${quantity}`)
}