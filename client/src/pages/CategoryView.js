import Jumbotron from "../components/cards/Jumbotron";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";

export default function CategoryView() {
    //state
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);

    //hooks
    const params = useParams();

    useEffect(() => {
        if (params?.slug) loadProductsByCategory();
    }, [params?.slug]);

    const loadProductsByCategory = async () => {
        try {
            const { data } = await axios.get(
                `/products-by-category/${params.slug}`
            );
            setProducts(data.products);
            setCategory(data.category);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Jumbotron
                title={category?.name}
                subTitle={`${products?.length} products found in category`}
            />
            <div className="container-fluid">
                <div className="row">
                    {products?.length < 1 && (
                        <p className="d-flex justify-content-center">
                            No product found
                        </p>
                    )}
                    {products?.map((p) => (
                        <div className="col-md-3" key={p._id}>
                            <ProductCard p={p} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
