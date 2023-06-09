import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import {
    FaDollarSign,
    FaProjectDiagram,
    FaRegClock,
    FaCheck,
    FaTimes,
    FaTruckMoving,
    FaWarehouse,
    FaRocket,
} from "react-icons/fa";
import ProductCard from "../components/cards/ProductCard";

export default function ProductView() {
    //state
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    //hook
    const params = useParams();

    useEffect(() => {
        if (params?.slug) loadProduct();
    }, [params?.slug]);

    const loadProduct = async () => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`);
            setProduct(data);
            loadRelated(data._id, data.category._id);
        } catch (err) {
            console.log(err);
        }
    };

    const loadRelated = async (productId, categoryId) => {
        try {
            const { data } = await axios.get(
                `/related-products/${productId}/${categoryId}`
            );
            setRelated(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9">
                        <div className="card mb-3">
                            <Badge.Ribbon
                                text={`${product?.sold} sold`}
                                color="red"
                            >
                                <Badge.Ribbon
                                    text={`${
                                        product?.quantity >= 1
                                            ? `${
                                                  product?.quantity -
                                                  product?.sold
                                              } in stock`
                                            : "Out of stock"
                                    }`}
                                    placement="start"
                                    color="green"
                                >
                                    <img
                                        className="card-img-top"
                                        src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                                        alt={product.name}
                                        style={{
                                            height: "500px",
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Badge.Ribbon>
                            </Badge.Ribbon>

                            <div className="card-body">
                                <h1 className="fw-bold">{product?.name}</h1>

                                <p
                                    className="card-text lead"
                                    style={{ height: "90px" }}
                                >
                                    {product?.description}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between lead p-5 bg-light fw-bold">
                                <div>
                                    <p>
                                        <FaDollarSign /> Price:{" "}
                                        {product?.price?.toLocaleString(
                                            "en-US",
                                            {
                                                style: "currency",
                                                currency: "USD",
                                            }
                                        )}
                                    </p>

                                    <p>
                                        <FaProjectDiagram /> Category:{" "}
                                        {product?.category?.name}
                                    </p>
                                    <p>
                                        <FaRegClock /> Added:{" "}
                                        {moment(product.createdAt).fromNow()}
                                    </p>
                                    <p>
                                        {product?.quantity > 0 ? (
                                            <FaCheck
                                                style={{ color: "green" }}
                                            />
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}{" "}
                                        {product?.quantity > 0
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </p>
                                    <p>
                                        <FaWarehouse />{" "}
                                        {product?.quantity - product?.sold}{" "}
                                        Available
                                    </p>
                                    <p>
                                        <FaRocket /> {product?.sold} Sold
                                    </p>
                                </div>
                            </div>

                            <button
                                className="btn btn-outline-primary col card-button"
                                style={{ borderBottomRightRadius: "5px" }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h1>Related Products</h1>
                        <hr />
                        {related?.length < 1 && <p>Nothing found</p>}
                        {related?.length > 0 &&
                            related.map((p) => (
                                <ProductCard key={p._id} p={p} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
