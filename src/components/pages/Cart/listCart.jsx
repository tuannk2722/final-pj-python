import { Row } from "antd";
import ItemCart from "./itemCart";

function ListCart(props) {
    const { data, onReload } = props;

    return (
        <>
            <Row gutter={[5, 5]}>
                {data.map(item => (
                    <ItemCart item={item} key={item.id} onReload={onReload}/>
                ))}
            </Row>
        </>
    )
}
export default ListCart;