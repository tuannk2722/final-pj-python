import axios from "axios";
import { Button, Col, Form, Input, message, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { LoginAction } from "../../helpers/user";

function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const success = () => {
        messageApi.open({ type: "success", content: "Đăng nhập thành công!" });
    };

    const error = () => {
        messageApi.open({ type: "error", content: "Tài khoản hoặc mật khẩu không đúng!" });
    };

    const onFinish = async (values) => {
        try {
            const res = await LoginAction(values);
            console.log(res);

            if (!res || !res.access) {
                return error(); // backend trả lỗi, không set undefined
            }

            localStorage.setItem("access", res.access);
            localStorage.setItem("refresh", res.refresh);
            localStorage.setItem("role", res.role);
            localStorage.setItem("user_id", res.user_id);

            // --- Gắn token mặc định vào axios ---
            // axios.defaults.headers.common["Authorization"] =
            //     `Bearer ${res.access}`;

            success();

            // điều hướng theo role
            if (res.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (err) {
            console.log(err);
            error();
        }
    };

    return (
        <>
            {contextHolder}
            <Form
                style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
                onFinish={onFinish}
            >
                <Row>
                    <Col span={24} style={{ minWidth: 400 }}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="VD: abcxyz" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item>
                            <Button block type="primary" htmlType="submit" style={{ marginBottom: 20 }}>
                                Đăng nhập
                            </Button>
                            or <Link to="/register">Đăng ký ngay!</Link>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Login;
