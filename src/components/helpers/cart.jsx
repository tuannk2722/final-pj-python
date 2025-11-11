import { del, get, patch, post } from "../ultis"

export const GetAllCart = async () => {
    const result = await get("cart/");
    return result;
}

export const GetItemCartByIdProduct = async (id) => {
    const result = await get(`cart/item/?product_id=${id}`);
    return result;
}

export const AddProductToCart = async (data) => {
    const result = await post("cart/", data);
    return result;
}

export const UpdateQuantityCart = async (id, data) => {
    const result = await patch(`cart/item/update/?product_id=${id}`, data);
    return result;
}

export const DeleteItemCart = async (id) => {
    const result = await del(`cart/${id}/`);
    return result;
}