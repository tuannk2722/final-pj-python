import LayoutDefault from "../LayoutDefault";
import Cart from "../pages/Cart";
import CreateProduct from "../pages/CreateProduct";
import Home from "../pages/Home";
import SearchedProductList from "../pages/searchedProductList";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "createProduct",
                element: <CreateProduct />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "searchedProductList/:id",
                element: <SearchedProductList />
            }
        ]
    }
]