import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const role = localStorage.getItem("role");   // chỉ cần role là biết đã login

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default PrivateRoute;
