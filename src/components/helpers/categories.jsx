import { get } from "../ultis"

export const GetAllCategories = async () => {
    const result = await get("categories/");
    return result;
}

export const GetCategoryById = async (id) => {
    const result = await get(`categories/${id}/`);
    return result;
}