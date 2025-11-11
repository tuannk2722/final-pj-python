import { Button, message, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
    AddProductToCart,
    GetAllCart,
    UpdateQuantityCart,
} from "../../helpers/cart";

function AddToCart({ item, onReload }) {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg = "Thêm vào giỏ hàng thành công!") =>
        messageApi.open({ type: "success", content: msg });
    const error = (msg = "Thêm vào giỏ hàng không thành công!") =>
        messageApi.open({ type: "error", content: msg });

    const handleClick = async () => {
        try {
            const result = await GetAllCart();

            const existed = result.find(itemCart => itemCart.product_id == item.id);

            if (existed) {
                // sản phẩm đã có -> cập nhật số lượng
                const newQuantity = existed.quantity + 1;
                const res = await UpdateQuantityCart(item.id, { quantity: newQuantity });

                if (res) {
                    success("Đã tăng số lượng sản phẩm trong giỏ!");
                    onReload?.();
                } else {
                    throw new Error("Không thể cập nhật số lượng!");
                }

            } else {
                // sản phẩm chưa có -> thêm mới
                const data = { product_id: item.id, quantity: 1 };
                const addResponse = await AddProductToCart(data);

                if (addResponse) {
                    success("Đã thêm sản phẩm mới vào giỏ hàng!");
                    onReload?.();
                } else {
                    throw new Error("Không thể thêm sản phẩm mới!");
                }
            }

        } catch (err) {
            console.error("AddToCart error:", err);
            error("Có lỗi xảy ra khi thêm sản phẩm!");
        }
    };

    return (
        <>
            {contextHolder}
            <Tooltip title="Thêm vào giỏ hàng">
                <Button onClick={handleClick}>
                    <ShoppingCartOutlined />
                </Button>
            </Tooltip>
        </>
    );
}

export default AddToCart;
