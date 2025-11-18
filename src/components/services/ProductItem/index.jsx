import { Badge, Card, Col } from "antd";
import AddToCart from "../AddToCart";
import '../../../App.css'

const { Meta } = Card;

function ProductItem(props) {
    const { item, onReload } = props;

    return (
        <>
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
                            // <EditProduct item={item} onReload={onReload} />,
                            // <DeleteProduct id={item.id} onReload={onReload} />,
                            <AddToCart item={item} onReload={onReload} />,
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
        </>
    )
}
export default ProductItem;