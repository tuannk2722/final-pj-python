import bg from "../../../img/BgShop.jpg";
import ProductList from "../../services/ProductList";
import SearchForm from "../../services/SearchForm";

function Home() {

    return (
        <>
            <div style={{
                minHeight: 300,
                backgroundImage: `url(${bg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 10px",
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                <div className="home__title" style={{ textAlign: "center" }}>
                    <h1>Chào mừng bạn đến với Shop Online của chúng tôi!</h1>
                    <h2>Nơi bạn có thể tìm thấy những sản phẩm yêu thích với giá hợp lý và chất lượng tuyệt vời.</h2>
                </div>
                <SearchForm />
            </div>

            <div style={{margin: 50}}>
                <ProductList />
            </div>
        </>
    )
}
export default Home;