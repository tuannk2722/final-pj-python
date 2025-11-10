import { Badge, Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ShoppingCartOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { GetAllCart } from "../helpers/cart";

const { Header, Content, Footer } = Layout;

function LayoutDefault() {
    const [current, setCurrent] = useState('home')
    const location = useLocation();
    const [ show, setShow ] = useState(false);

    const fetchApi = async () => {
        const response = await GetAllCart();
        if (response) {
            setShow(true);
        }
    }

    useEffect(() => {
        fetchApi();
        if (location.pathname === "/") {
            setCurrent("home");
        } else {
            setCurrent(location.pathname.replace("/", ""))
        }
    }, [location.pathname])

    const items = [
        {
            key: "createProduct",
            label: <Link to="createProduct">New Product</Link>,
            icon: <PlusCircleOutlined />,
            className: "menu__login",
        },
        {
            key: "cart",
            label: <Link to="cart">Cart</Link>,
            icon: <Badge dot={show}><ShoppingCartOutlined style={{fontSize: 18}}/></Badge>
        }
    ]

    return (
        <>
            <Layout>
                <Header style={{ display: "flex", alignItems: "center", backgroundColor: "#fff", position: "fixed", zIndex: 2, width: "100%", borderRadius: 50 }}>
                    <Link to="/" className="menu__logo">
                        Logo
                    </Link>
                    <Menu
                        items={items}
                        mode="horizontal"
                        selectedKeys={[current]}
                        style={{ flex: 1, minWidth: 0, borderBottom: "none" }}
                    />
                </Header>

                <Content style={{ marginTop: 64, minHeight: "80vh" }}>
                    <Outlet />
                </Content>

                <Footer style={{ display: "flex", justifyContent: "center", backgroundColor: "#ccc", fontWeight: 700 }}>
                    Copyright @by ...
                </Footer>
            </Layout>
        </>
    )
}
export default LayoutDefault;