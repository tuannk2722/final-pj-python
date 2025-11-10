import { Button, message, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { AddProductToCart, GetAllCart, GetItemCartByIdProduct, UpdateQuantityCart } from "../../helpers/cart";

function AddToCart(props) {
    const { item, onReload } = props;
    const [ messageApi, contextHolder ] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Thêm vào giỏ hàng thành công!"
        })
    }
    const error = () => {
        messageApi.open({
            type: "error",
            content: "Thêm vào giỏ hàng không thành công!"
        })
    }

    const handleClick = async () => {
        const cart = await GetAllCart();
        if (cart) {
            if (cart.some(itemCart => itemCart.product_id === item.id)) {
                const result = await GetItemCartByIdProduct(item.id);
                if (result) {
                    console.log(result);
                    const data = {
                        quantity: ++result.quantity
                    }
                    const response = await UpdateQuantityCart(result.id, data);
                    if (response) {
                        success();
                        setTimeout(() => {
                            onReload();
                        }, 1000)
                    } else {
                        error();
                    }
                }
            } else {
                const data = {
                    product_id: item.id,
                    quantity: 1
                }
                const result = await AddProductToCart(data);
                if (result) {
                    success();
                } else {
                    error();
                }
            }
        }
    }

    return (
        <>
            {contextHolder}
            <Tooltip title="Thêm vào giỏ hàng">
                <Button onClick={handleClick}><ShoppingCartOutlined /></Button>
            </Tooltip>
        </>
    )
}
export default AddToCart;