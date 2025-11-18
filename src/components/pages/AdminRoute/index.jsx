import { Navigate, Outlet } from "react-router-dom";
import { getCookieValue } from "../../helpers/cookie";

function AdminRoute() {
    const access = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (!access) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;
