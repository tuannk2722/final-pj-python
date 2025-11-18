import { get, patch, post } from "../ultis"

export const CreateOrderAction = async (data) => {
    const result = await post("order/create/", data);
    return result;
}

export const GetAllOrders = async () => {
    const result = await get("order/");
    return result;
}

export const UpdateStatusOrder = async (id, data) => {
    const result = await patch(`order/cancel/${id}/`, data);
    return result;
}