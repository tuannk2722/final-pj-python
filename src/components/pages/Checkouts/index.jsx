import { useEffect, useState } from "react";
import { GetAllOrders, UpdateStatusOrder } from "../../helpers/orders";
import { Button, Card, Col, message, Row, Tag } from "antd";

function Checkouts() {
    const [data, setData] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({ type: "success", content: "Hủy đơn hàng thành công!"})
    }
    const error = () => {
        messageApi.open({ type: "error", content: "Hủy đơn hàng thất bại!"})
    }

    const fetchApi = async () => {
        try {
            const response = await GetAllOrders();
            setData(response);
            console.log(response)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const handleCancel = async (id) => {
        console.log(id);
        try {
            await UpdateStatusOrder(id, {status: "cancel"})
            fetchApi();
            success();
        } catch (err) {
            console.log(err);
            error();
        }
    }

    return (
        <>
            {contextHolder}
            <div style={{ margin: 50 }}>
                {data.length > 0 && (
                    <Row gutter={[20, 20]}>
                        {data.map((item, key) => (
                            <Col key={key} xxl={6} xl={6} lg={8} md={12} sm={12} xs={24}>
                                <Card
                                    title={`Đơn hàng ${key + 1}`}
                                    extra={
                                        <Tag color="gray">
                                            {item.status?.toUpperCase()}
                                        </Tag>
                                    }
                                >
                                    <div style={{marginBottom: 10}}><b>Sô điện thoại:</b> {item.phone}</div>
                                    <div style={{marginBottom: 10}}><b>Địa chỉchỉ: </b> {item.address}</div>
                                    <div style={{marginBottom: 10}}><b>Ngày tạo đơn:</b> {item.time_create}</div>
                                    <div style={{marginBottom: 10}}><b>Ghi chú đơn hàng:</b> {item.note}</div>
                                    <div style={{marginBottom: 10}}><b>Tổng tiền:</b> <span style={{ color: "red" }}>{item.total}đ</span></div>
                                    <div><Button onClick={() => handleCancel(item.id)}>Hủy đơn hàng</Button></div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </>
    )
}
export default Checkouts;