import { del, get, patch, post } from "../ultis"

export const GetProductById = async (id) => {
    const result = await get(`products/${id}/`);
    return result;
}

export const GetAllProducts = async () => {
    const result = await get("products/");
    return result;
}

export const DelProduct = async (id) => {
    const result = del(`products/${id}/`);
    return result;
}

export const EditProductAction = async (id, data) => {
    const result =  await patch(`products/${id}/`, data);
    return result;
} 

export const CreateProductAction = async (data) => {
    const result = await post("products/", data);
    return result;
} 

export const FilterProductByCategoryName = async (name) => {
    const result = await get(`products/filter/?category=${name}`);
    return result;
}

export const SortProduct = async (key, id) => {
    const result = await get(`products/filter/?sort=${key}&category=${id}`);
    return result;
}
