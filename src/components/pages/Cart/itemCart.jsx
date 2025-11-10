import { Button, Col, message, Popconfirm } from "antd";
import { DeleteItemCart, GetItemCartByIdProduct } from "../../helpers/cart";

function ItemCart(props) {
    const { item, onReload } = props;
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

    const confirm = async () => {
        console.log(item);
        const response = await GetItemCartByIdProduct(item.id);
        if (response) {
            const result = await DeleteItemCart(response.id);
            if (result) {
                success();
                setTimeout(() => {
                    onReload();
                }, 1500);
            } else {
                error();
            }
        } else {
            error();
        }
    }

    const cancel = () => {
        error();
    }

    return (
        <>
            {contextHolder}
            <Col span={24} style={{ display: "flex", minHeight: 80, border: "1px solid #ddd" }}>
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
                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có chắc muốn xóa tất cả sản phẩm không?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger style={{ margin: 20 }}>Delete</Button>
                    </Popconfirm>
                </div>
            </Col>
        </>
    )
}
export default ItemCart;