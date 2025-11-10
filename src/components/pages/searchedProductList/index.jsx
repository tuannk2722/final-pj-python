import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilterProductByCategoryName, SortProduct } from "../../helpers/product";
import { GetCategoryById } from "../../helpers/categories";
import { Col, Row, Select } from "antd";
import ProductItem from "../../services/ProductItem";

function SearchedProductList() {
    const { id } = useParams()
    const [data, setData] = useState([]);

    const fetchApi = async () => {
        const result1 = await FilterProductByCategoryName(id);
        if (result1) {
            setData(result1);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const handleChange = async (e) => {
        console.log(e);
        console.log(data);
        const response = await SortProduct(e, id);
        setData(response);
    }

    const handleReload = () => fetchApi();

    return (
        <>
            <div style={{ margin: 30 }}>
                <h2>Danh sách sản phẩm tìm kiếm được: </h2>
            </div>
            {data.length > 0 ? (
                <div>
                    <div style={{ margin: 30, fontSize: 16 }}>
                        <span>Hiển thị theo: </span>
                        <Select
                            defaultValue="Mặc định"
                            style={{ width: 200 }}
                            onChange={handleChange}
                            options={[
                                { value: 'price_asc', label: 'Giá tăng dần' },
                                { value: 'price_desc', label: 'Giá giảm dần' },
                            ]}
                        />
                    </div>
                    <Row gutter={[-30, 20]}>
                        {data.map(item => (
                            <Col key={item.id} xxl={4} xl={4} lg={6} md={8} sm={12} xs={24}>
                                <ProductItem item={item} onReload={handleReload} />
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                <h3>Hiện chưa có sản phẩm thuộc danh mục này rồi!</h3>
            )}
        </>
    )
}
export default SearchedProductList;