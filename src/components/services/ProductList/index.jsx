import { useEffect, useState } from "react";
import { GetAllProducts } from "../../helpers/product";
import { Row, Col } from "antd";
import ProductItem from "../ProductItem";

function ProductList() {
    const [data, setData] = useState([]);

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
                <Row gutter={[-30, 20]}>
                    {data.map(item => (
                        <Col key={item.id} xxl={4} xl={4} lg={6} md={8} sm={12} xs={24}>
                            <ProductItem item={item} onReload={handleReload} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}
export default ProductList;