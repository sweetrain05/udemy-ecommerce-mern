import { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "../prices";

export default function Shop() {
    // state
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]); // multiple categories in array
    const [radio, setRadio] = useState([]);

    useEffect(() => {
        if (!checked.length || !radio.length) loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/products");
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (checked.length || radio.length) loadFilteredProducts();
    }, [checked, radio]);

    const loadFilteredProducts = async () => {
        try {
            const { data } = await axios.post("/filtered-products", {
                checked,
                radio,
            });
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCheck = (value, id) => {
        console.log(value, id);
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    return (
        <>
            <Jumbotron title="Shop" subTitle="Welcome to shopping page" />
            <pre>{JSON.stringify({ checked, radio }, null, 4)}</pre>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            Filter by Categories
                        </h2>
                        <div className="row p-2">
                            {categories?.map((c) => (
                                <Checkbox
                                    key={c._id}
                                    onChange={(e) =>
                                        handleCheck(e.target.checked, c._id)
                                    }
                                >
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>
                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            Filter by Price
                        </h2>
                        <div className="row p-2">
                            <Radio.Group
                                onChange={(e) => {
                                    setRadio(e.target.value);
                                }}
                            >
                                {prices?.map((p) => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className="row p-2">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => window.location.reload()}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            {products?.length} Products
                        </h2>
                        <div
                            className="row"
                            style={{ height: "100vh", overflow: "scroll" }}
                        >
                            {products?.map((p) => (
                                <div className="col-md-4" key={p._id}>
                                    <ProductCard p={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
