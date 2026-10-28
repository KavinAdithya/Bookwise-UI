import apiClient from "../../api/ApiClient";

export async function getAdminRevenueSummary(startDate, endDate, incomeType) {
    return apiClient.get("/admin-revenue/summary", {
        params: {
            startDate,
            endDate,
            incomeType
        }
    });
}

export function getDashboardDetails() {
    return apiClient.get('/admin/dashboard');
}               