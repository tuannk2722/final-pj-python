import { Button, Checkbox, Col, Form, Input, InputNumber, message, Modal, Row, Select, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { GetAllCategories, GetCategoryById } from "../../helpers/categories";
import { EditProductAction } from "../../helpers/product";

function EditProduct(props) {
    const { item, onReload } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [edit, setEdit] = useState(true);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [categories, setCategories] = useState([]);

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Cập nhật thông tin thành công!"
        })
    }
    const error = () => {
        messageApi.open({
            type: "error",
            content: "Cập nhật thông tin thất bại!"
        })
    }

    const fetchApi = async () => {
        const result = await GetAllCategories();
        const result1 = await GetCategoryById(item.categoryId);
        if (result && result1) {
            setCategories(result);
            form.setFieldsValue({
                ...item,
            });
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            fetchApi();
        }
    }, [isModalOpen, item]);

    const handleModal = () => setIsModalOpen(true);

    const handleCancel = () => {
        error();
        setIsModalOpen(false);
    }

    const handleCancelEdit = () => {
        form.resetFields();
        setEdit(!edit);
        error();
        setIsModalOpen(false);
    }

    const handleSubmit = async (e) => {
        e.id = item.id;
        e.categoryId = Number(e.categoryId);
        const response = await EditProductAction(e.id, e);
        if (response) {
            success();
            setEdit(!edit);
            setIsModalOpen(false);
            setTimeout(() => {
                onReload();
            }, 1000)
        }
    }

    return (
        <>
            {contextHolder}
            <Tooltip title="Chỉnh sửa sản phẩm">
                <Button onClick={handleModal}><EditOutlined /></Button>
                <Modal
                    title="Chỉnh sửa sản phẩm"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <div>
                        <Checkbox
                            onChange={(e) => setEdit(!e.target.checked)}
                            style={{ marginTop: 30 }}
                            checked={!edit}
                        >
                            Chỉnh sửa thông tin
                        </Checkbox>
                    </div>
                    <Form
                        onFinish={handleSubmit}
                        disabled={edit}
                        layout="vertical"
                        initialValues={item}
                        form={form}
                        style={{ marginTop: 30 }}
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
                                    <Button style={{ width: 150, marginRight: 20 }} type="primary" htmlType="submit">Chỉnh sửa</Button>
                                    <Button style={{ width: 100 }} onClick={handleCancelEdit}>Hủy</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Tooltip>
        </>
    )
}
export default EditProduct;