import apiClient from "../../api/ApiClient";

export function fetchAllSubscriptionPlans() {
     return apiClient
                .get(
                    "/subscriptions"
                )
}

export function getSubscriptionDetails() {
    return apiClient
            .get(`/subscription/me`)
}