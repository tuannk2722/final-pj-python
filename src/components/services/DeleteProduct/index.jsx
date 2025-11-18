import { Button, message, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DelProduct } from "../../helpers/product";
import { DeleteItemCart, GetAllCart, GetItemCartByIdProduct } from "../../helpers/cart";

function DeleteProduct(props) {
    const {id, onReload} = props;
    const [ messageApi, contextHolder ] = message.useMessage();

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

    const confirm = async () => {
        const result1 = await GetAllCart();
        if (result1.find(item => item.product_id == id)) {
            const result = await GetItemCartByIdProduct(id);
            await DeleteItemCart(result.id);
        }
        const result = await DelProduct(id);
        if (result) {
            success();
            setTimeout(() => {
                onReload();
            }, 1500)
        }
    } 
    
    const cancel = () => {
        error();
    }

    return (
        <>
            {contextHolder}
            <Tooltip title="Xóa sản phẩm">
                <Popconfirm
                    title="Xóa sản phẩm"
                    description="Bạn có chắc muốn xóa sản phẩm không?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Có"
                    cancelText="Không"
                >
                    <Button danger><DeleteOutlined /></Button>
                </Popconfirm>
            </Tooltip>
        </>
    )
}
export default DeleteProduct;