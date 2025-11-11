import { Button, Col, Form, Input, InputNumber, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { GetAllCategories } from "../../helpers/categories";
import { CreateProductAction } from "../../helpers/product";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
    const [messageApi, contextHolder] = message.useMessage();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Tạo mới sản phẩm thành công!"
        })
    }
    const error = () => {
        messageApi.open({
            type: "error",
            content: "Tạo mới sản phẩm thất bại!"
        })
    }

    const fetchApi = async () => {
        const result = await GetAllCategories();
        if (result) {
            setCategories(result);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const handleSubmit = async (e) => {
        e.categoryId = Number(e.categoryId);
        const response = await CreateProductAction(e);
        if (response) {
            success();
            setTimeout(() => {
                navigate("/");
            }, 1500)
        } else {
            error();
        }
    }

    const handleCancel = () => {
        error();
        setTimeout(() => {
            navigate("/");
        }, 1000)
    }

    return (
        <>
            {contextHolder}
            <Form
                onFinish={handleSubmit}
                layout="vertical"
                style={{ marginTop: 30, width: "70%", marginLeft: "auto", marginRight: "auto" }}
            >
                <Row gutter={[20, 10]}>
                    <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                        <Form.Item
                            label="Tên sản phẩm"
                            name="title"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                        <Form.Item
                            label="Danh mục"
                            name="categoryId"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Select>
                                {categories.length > 0 && (
                                    categories.map(data => (
                                        <Select.Option key={data.id}>{data.name}</Select.Option>
                                    ))
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <InputNumber addonAfter="đ" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                        <Form.Item
                            label="Giảm giá"
                            name="discountPercentage"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <InputNumber addonAfter="%" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                        <Form.Item
                            label="Số lượng"
                            name="stock"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Input.TextArea rows={2} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Link ảnh"
                            name="thumbnail"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button style={{ width: 150, marginRight: 20 }} type="primary" htmlType="submit">Hoàn thành</Button>
                            <Button style={{ width: 100 }} onClick={handleCancel}>Hủy</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default CreateProduct;