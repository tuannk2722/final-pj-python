import LayoutAdmin from "../LayoutAdmin";
import LayoutDefault from "../LayoutDefault";
import AdminRoute from "../pages/AdminRoute";
import Cart from "../pages/Cart";
import Checkouts from "../pages/Checkouts";
import CreateProduct from "../pages/CreateProduct";
import Home from "../pages/Home";
import HomeAdmin from "../pages/HomeAdmin";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Orders from "../pages/Orders";
import PrivateRoute from "../pages/PrivateRoute";
import Register from "../pages/Register";
import SearchedProductList from "../pages/searchedProductList";

export const routes = [
    // ===== Layout người dùng =====
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "searchedProductList/:id", element: <SearchedProductList /> },

            // Các trang user phải đăng nhập
            {
                element: <PrivateRoute />,   // yêu cầu token
                children: [
                    { path: "cart", element: <Cart /> },
                    { path: "orders", element: <Orders /> },
                    {path: "checkouts", element: <Checkouts /> },
                    { path: "logout", element: <Logout /> },
                ]
            }
        ],
    },

    // ===== Layout Admin =====
    {
        path: "/admin",
        element: <AdminRoute />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    { index: true, element: <HomeAdmin /> },
                    { path: "createProduct", element: <CreateProduct /> },
                    { path: "cart", element: <Cart /> },
                    { path: "logout", element: <Logout /> },
                ]
            }
        ]
    }
];
