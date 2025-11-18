import { Badge, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
    ShoppingCartOutlined,
    PlusCircleOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserOutlined,
    ProductOutlined
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

function LayoutDefault() {
    const role = localStorage.getItem("role");

    // Menu khi chưa login
    const menuGuest = [
        {
            key: "login",
            label: <Link to="/login">Login</Link>,
            icon: <LoginOutlined />,
            className: "menu__login"
        },
        {
            key: "register",
            label: <Link to="/register">Register</Link>,
        }
    ];

    // Menu của user
    const menuUser = [
        {
            key: "cart",
            label: <Link to="/cart">Cart</Link>,
            icon: (
                <Badge dot>
                    <ShoppingCartOutlined style={{ fontSize: 18 }} />
                </Badge>
            ),
            className: "menu__login"
        },
        {
            key: "order",
            label: <Link to="/orders">Orders</Link>,
            icon: <ProductOutlined />
        },
        {
            key: "logout",
            label: <Link to="/logout">Logout</Link>,
            icon: <LogoutOutlined />
        }
    ];

    // Menu của admin
    const menuAdmin = [
        {
            key: "admin",
            label: <Link to="/admin">Quản lý</Link>,
            icon: <UserOutlined />,
            className: "menu__login"
        },
        {
            key: "createProduct",
            label: <Link to="/admin/createProduct">New Product</Link>,
            icon: <PlusCircleOutlined />,
        },
        {
            key: "cart",
            label: <Link to="/cart">Cart</Link>,
            icon: (
                <Badge dot>
                    <ShoppingCartOutlined style={{ fontSize: 18 }} />
                </Badge>
            )
        },
        {
            key: "order",
            label: <Link to="/orders">Orders</Link>,
            icon: <ProductOutlined />
        },
        {
            key: "logout",
            label: <Link to="/logout">Logout</Link>,
            icon: <LogoutOutlined />
        }
    ];

    // Chọn menu theo role
    let menuList = menuGuest;
    if (role) {
        menuList = role === "admin" ? menuAdmin : menuUser;
    }

    return (
        <Layout>
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    position: "fixed",
                    zIndex: 2,
                    width: "100%",
                    borderRadius: 50
                }}
            >
                <Link to="/" className="menu__logo">
                    Logo
                </Link>

                <Menu
                    items={menuList}
                    mode="horizontal"
                    style={{ flex: 1, minWidth: 0, borderBottom: "none" }}
                />
            </Header>

            <Content style={{ marginTop: 64, minHeight: "80vh" }}>
                <Outlet />
            </Content>

            <Footer
                style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#ccc",
                    fontWeight: 700
                }}
            >
                Copyright @by ...
            </Footer>
        </Layout>
    );
}

export default LayoutDefault;
