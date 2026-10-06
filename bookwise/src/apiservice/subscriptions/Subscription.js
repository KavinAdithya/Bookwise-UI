import apiClient from "../../api/ApiClient";

export function fetchAllSubscriptionPlans() {
     return apiClient
                .get(
                    "/subscriptions"
                )
}

export function getSubscriptionDetails() {
    return apiClient
            .get(`/subscriptions/me`)
}
export async function getSubscriptionUpgradeDetails(
    subscriptionId
) {
    return apiClient.get(
        `/subscriptions/confirm/upgrade/${subscriptionId}`
    );
}


export async function upgradeSubscription(
    data
) {
    return apiClient.post(
        "/subscriptions/upgrade",
        data
    );
}