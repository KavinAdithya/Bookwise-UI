import apiClient from "../../api/ApiClient";

export function fetchAllSubscriptionPlans() {
     return apiClient
                .get(
                    "/subscriptions"
                )
}