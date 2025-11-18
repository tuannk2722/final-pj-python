import { post } from "../ultis"

export const LoginAction = async (data) => {
    const result = await post("login/", data);
    return result;
}

export const RegisterAction = async (data) => {
    const result = await post("register/", data);
    return result;
}