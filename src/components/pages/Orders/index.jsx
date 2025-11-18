import { Button, Col, Form, Input, InputNumber, message, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { GetAllCart } from "../../helpers/cart";
import { useNavigate } from "react-router-dom";
import { GetAllProducts } from "../../helpers/product";
import { CreateOrderAction } from "../../helpers/orders";

function Orders() {
    const [data, setData] = useState([]);
    const [dataCart, setDataCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const success = () =>
        messageApi.open({ type: "success", content: "Tạo đơn hàng thành công!" });

    const error = () =>
        messageApi.open({ type: "error", content: "Tạo đơn hàng không thành công!" });

    const fetchApi = useCallback(async () => {
        try {
            const [result, allProducts] = await Promise.all([
                GetAllCart(),
                GetAllProducts(),
            ]);

            if (result && allProducts) {
                const finalData = result.map(cartItem => {
                    const product = allProducts.find(p => p.id == cartItem.product_id);
                    return { ...product, quantity: cartItem.quantity };
                });

                const newTotal = finalData.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );

                setDataCart(result);
                setData(finalData);
                setTotal(newTotal);
            }
        } catch (err) {
            console.error("Fetch cart failed:", err);
        }
    }, []);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    const onFinish = async (values) => {
        try {
            const payload = {
                cartItems: dataCart.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity
                })),
                address: values.address,
                phone: values.phone,
                note: values.note || ""
            };

            await CreateOrderAction(payload);

            success();
            setTimeout(() => {
                navigate("/checkouts");
            }, 1000)
        } catch (err) {
            console.error(err);
            error();
        }
    };

    return (
        <>
            {contextHolder}
            <div>
                <h2>Thông tin giao hàng</h2>
            </div>
            <Row gutter={[20, 30]}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Row gutter={[10, 10]}>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                                <Form.Item
                                    label="Địa chỉ giao hàng"
                                    name="address"
                                    rules={[{ required: true, message: "Bắt buộc" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                                <Form.Item
                                    label="Phone number"
                                    name="phone"
                                    rules={[{ required: true, message: "Bắt buộc" }]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="Ghi chú đơn hàng (tùy chọn)"
                                    name="note"
                                >
                                    <Input.TextArea showCount maxLength={100} />
                                </Form.Item>
                            </Col>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: "100%", marginTop: 20, marginLeft: "auto" }}>Hoàn tất đơn hàng</Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Row gutter={[5, 5]}>
                        {data.map(item => (
                            <Col key={item.id} span={24} style={{ display: "flex", minHeight: 80, borderTop: "1px solid #ddd" }}>
                                <div>
                                    <img src={item.thumbnail} alt="Logo" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: "20%", marginRight: 30 }} />
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <div style={{ fontSize: 16 }}>
                                        <b>{item.title}</b>
                                    </div>
                                    <div>Giá: {item.price} đ</div>
                                </div>
                                <div style={{ marginLeft: "auto" }}>
                                    <span style={{ margin: 20 }}>Số lượng: {item.quantity}</span>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <div style={{ display: "flex", justifyContent: "flex-end", borderBottom: "3px solid #ddd" }}>
                        <h3>
                            Thành tiền: <span style={{ color: "red" }}>{total.toFixed(0)} đ</span>
                        </h3>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default Orders;