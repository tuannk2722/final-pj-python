const DO_MAIN = "https://quyet1110.pythonanywhere.com/api/";

// Hàm helper lấy header, chỉ thêm Authorization nếu token tồn tại
const getHeaders = (isJson = true) => {
    const headers = {};
    if (isJson) {
        headers["Accept"] = "application/json";
        headers["Content-Type"] = "application/json";
    }
    const token = localStorage.getItem("access");
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

// GET
export const get = async (path) => {
    const response = await fetch(DO_MAIN + path, {
        method: "GET",
        headers: getHeaders(false), // GET không cần Content-Type
    });
    return await response.json();
};

// POST
export const post = async (path, data) => {
    const response = await fetch(DO_MAIN + path, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return await response.json();
};

// PATCH
export const patch = async (path, data) => {
    const response = await fetch(DO_MAIN + path, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return await response.json();
};

// DELETE
export const del = async (path) => {
    const response = await fetch(DO_MAIN + path, {
        method: "DELETE",
        headers: getHeaders(false), // DELETE không cần Content-Type
    });

    try {
        return await response.json();
    } catch {
        return { success: response.ok };
    }
};
