import apiClient from "../../api/apiClient";

export async function fetchCategoriesChoice() {
    return apiClient
        .get("/categories/choices") 
}