import { useEffect, useState, useCallback } from "react";
import { GetAllProducts } from "../../helpers/product";
import ListCart from "./listCart";
import { DeleteItemCart, GetAllCart } from "../../helpers/cart";
import { Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";

function Cart() {
    const [data, setData] = useState([]);
    const [dataCart, setDataCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg = "Xóa sản phẩm thành công!") =>
        messageApi.open({ type: "success", content: msg });

    const error = (msg = "Xóa sản phẩm không thành công!") =>
        messageApi.open({ type: "error", content: msg });

    // dùng useCallback để tránh tạo lại function mỗi lần render
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
            error("Không thể tải giỏ hàng!");
        }
    }, []);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    const confirm = async () => {
        try {
            // Xóa tất cả item song song
            await Promise.all(dataCart.map(item => DeleteItemCart(item.id)));

            success("Đã xóa toàn bộ sản phẩm!");

            // Gọi lại API để đồng bộ với backend
            fetchApi();
        } catch (err) {
            console.error(err);
            error("Một số sản phẩm chưa được xóa!");
        }
    };

    const cancel = () => error("Hủy xóa sản phẩm");

    return (
        <>
            {contextHolder}
            <div
                style={{
                    width: "80%",
                    margin: "0 auto 30px auto",
                }}
            >
                <h2>Giỏ hàng</h2>

                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 30 }}>
                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có chắc muốn xóa tất cả sản phẩm không?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>Xóa tất cả</Button>
                    </Popconfirm>
                </div>

                {data.length > 0 ? (
                    <ListCart data={data} onReload={fetchApi} />
                ) : (
                    <p>Empty Cart</p>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <h3>
                        Thành tiền: <span style={{ color: "red" }}>{total.toFixed(0)} đ</span>
                    </h3>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="primary">
                        <Link to="/orders">Tạo đơn hàng</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Cart;
