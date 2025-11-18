import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { PlusCircleOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

function LayoutAdmin() {
    const role = localStorage.getItem("role");

    // Bảo vệ layout admin ở cấp UI
    if (role !== "admin") {
        return (
            <Layout>
                <Content style={{ padding: 50 }}>
                    <h2>Bạn không có quyền truy cập trang Admin</h2>
                </Content>
            </Layout>
        );
    }

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
            key: "logout",
            label: <Link to="/logout">Logout</Link>,
            icon: <LogoutOutlined />
        }
    ];

    return (
        <Layout>
            <Header style={{ display: "flex", alignItems: "center", backgroundColor: "#fff", position: "fixed", zIndex: 2, width: "100%", borderRadius: 50 }}>
                <Link to="/" className="menu__logo">Logo</Link>

                <Menu
                    items={menuAdmin}
                    mode="horizontal"
                    style={{ flex: 1, minWidth: 0, borderBottom: "none" }}
                />
            </Header>

            <Content style={{ marginTop: 64, minHeight: "80vh" }}>
                <Outlet />
            </Content>

            <Footer style={{ display: "flex", justifyContent: "center", backgroundColor: "#ccc", fontWeight: 700 }}>
                Admin Panel
            </Footer>
        </Layout>
    );
}

export default LayoutAdmin;
