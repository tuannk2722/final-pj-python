import { useEffect, useState } from "react";
import { GetAllProducts } from "../../helpers/product";
import { Badge, Card, Col, Row } from "antd";
import EditProduct from "../../services/EditProduct";
import DeleteProduct from "../../services/DeleteProduct";

const { Meta } = Card;

function HomeAdmin() {
    const [data, setData] = useState([])

    const fetchApi = async () => {
        const result = await GetAllProducts();
        if (result) {
            setData(result.reverse());
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const handleReload = () => fetchApi();

    return (
        <>
            {data.length > 0 && (
                <Row gutter={[10, 20]} style={{margin: 50}}>
                    {data.map(item => (
                        <Col key={item.id} xxl={4} xl={4} lg={6} md={8} sm={12} xs={24}>
                            <div style={{ position: "relative", display: "block", width: "100%" }}>
                                <Badge.Ribbon
                                    text={`-${item.discountPercentage}%`}
                                    color="yellow"
                                    placement="end"
                                >
                                    <Card
                                        className="product-card"
                                        hoverable
                                        style={{
                                            width: "100%",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                        }}
                                        cover={
                                            <img
                                                draggable={false}
                                                alt={item.title}
                                                src={item.thumbnail}
                                                style={{
                                                    height: 150,
                                                    width: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        }
                                        actions={[
                                            <EditProduct item={item} onReload={handleReload} />,
                                            <DeleteProduct id={item.id} onReload={handleReload} />,
                                        ]}
                                    >
                                        <Meta
                                            title={item.title}
                                            description={
                                                <div>
                                                    <span style={{ color: "#ff4d4f", fontSize: "16px", fontWeight: "bold" }}>
                                                        {item.price} ₫
                                                    </span>
                                                    <div>Stock: {item.stock}</div>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Badge.Ribbon>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}
export default HomeAdmin;