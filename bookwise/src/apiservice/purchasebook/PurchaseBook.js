import apiClient from "../../api/apiClient";

export function findAllPurchasedBooks() {
    return apiClient.get(`/user/me/purchase-books`)
}

export function computePurchaseBookDetails(bookId, quantity) {
    return apiClient.get(`/purchase-books/calculate-amount` , {
        params: {
            "bookId":bookId,
            "quantity":quantity
        }
    })
}

export function registerPurchaseBook(data) {
    return apiClient.post(`/purchase-books/register`, data)
}

export function getPurchasedBookDetails(purchaseBookId) {
    return apiClient.get(`/user/me/purchase-books/${purchaseBookId}`)
}