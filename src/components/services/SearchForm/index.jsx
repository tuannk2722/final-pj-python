import { useEffect, useState } from "react";
import { GetAllCategories } from "../../helpers/categories";
import { Tag } from "antd";
import { Link } from "react-router-dom";

function SearchForm() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await GetAllCategories();
            if (result) {
                setCategories(result);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            <div style={{display: "block"}}>
                {categories.length > 0 && (
                    categories.map(item => (
                        <Tag key={item.id} style={{fontSize: 16, marginTop: 10,  border: "none" }}>
                            <Link to={`/searchedProductList/${item.id}`}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Link>
                        </Tag>
                    ))
                )}
            </div>
        </>
    )
}
export default SearchForm;