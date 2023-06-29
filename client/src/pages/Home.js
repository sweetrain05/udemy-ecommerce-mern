import Jumbotron from "../components/cards/Jumbotron";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/products");
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };

    // create another list of products which is sorted based on sold quantity
    const arr = [...products];
    const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

    return (
        <div>
            <Jumbotron
                title="Hello World"
                subTitle="Welcome to React E-commerce"
            />

            <div className="row">
                <div className="col-md-6">
                    <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                        New Arrivals
                    </h2>
                    <div className="row">
                        {products?.map((p) => (
                            <div className="col-md-6" key={p._id}>
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-6">
                    <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                        Best Sellers
                    </h2>
                    <div className="row">
                        {sortedBySold?.map((p) => (
                            <div className="col-md-6" key={p._id}>
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
