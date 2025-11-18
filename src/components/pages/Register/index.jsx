import { Button, Col, Form, Input, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterAction } from "../../helpers/user";

function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const success = () => {
        messageApi.open({ type: "success", content: "Đăng ký thành công!" });
    };

    const error = () => {
        messageApi.open({ type: "error", content: "Tài khoản hoặc mật khẩu đã tồn tại!" });
    };

    const onFinish = async (e) => {
        try {
            await RegisterAction(e);
            success();
            setTimeout(() => {
                navigate("/login");
            }, 1000)
        } catch (err) {
            console.log(err);
            error();
        }
    }

    return (
        <>
            {contextHolder}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <Col xxl={8} xl={8} lg={12} md={18} sm={20} xs={20}>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Row gutter={[10, 10]}>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                                <Form.Item
                                    label="First Name"
                                    name="first_name"
                                    rules={[{ required: true, message: "Bắt buộc!" }]}    
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                                <Form.Item
                                    label="Last Name"
                                    name="last_name"
                                    rules={[{ required: true, message: "Bắt buộc!" }]}    
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="Tài khoản"
                            name="username"
                            rules={[{ required: true, message: "Bắt buộc!" }]}
                        >
                            <Input placeholder="VD: abcxyz" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: "Bắt buộc!" }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="password2"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Bắt buộc!" }]}
                        >
                            <Input placeholder="abc123@gmail.com" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "100%", marginTop: 20 }}>Đăng ký</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </div>
        </>
    )
}
export default Register;