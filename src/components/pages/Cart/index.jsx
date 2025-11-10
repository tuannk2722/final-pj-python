import { useEffect, useState } from "react";
import { GetAllProducts } from "../../helpers/product";
import ListCart from "./listCart";
import { GetAllCart } from "../../helpers/cart";
import { Button, message, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { DeleteAll } from "../../action/cart";

function Cart() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Xóa sản phẩm thành công!"
        })
    }
    const error = () => {
        messageApi.open({
            type: "error",
            content: "Xóa sản phẩm không thành công!"
        })
    }

    const fetchApi = async () => {
        const result = await GetAllCart();
        const allProducts = await GetAllProducts();
        if (result && allProducts) {
            console.log(result);
            let finalData = result.map(cartItem => {
                const product = allProducts.find(p => p.id == cartItem.product_id);
                return {
                    ...product,
                    quantity: cartItem.quantity
                }
            })
            const newTotal = finalData.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotal(newTotal);
            console.log(finalData);
            setData(finalData);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const confirm = () => {
        dispatch(DeleteAll())
        success();
        setData([]);
        setTotal(0);
    };

    const handleReload = () => fetchApi();

    const cancel = () => error();

    return (
        <>
            {contextHolder}
            <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginBottom: 30 }}>
                <div>
                    <h2>Giỏ hàng</h2>
                </div>
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
                    <ListCart data={data} onReload={handleReload}/>
                ) : (
                    <>
                        Empty Cart
                    </>
                )}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 30 }}>
                    <h3>Thành tiền: <span style={{ color: "red" }}>{total.toFixed(0)} đ</span></h3>
                </div>
            </div>
        </>
    )
}

export default Cart;