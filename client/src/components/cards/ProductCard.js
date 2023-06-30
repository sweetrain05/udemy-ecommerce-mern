import moment from "moment";
import { Badge } from "antd";

export default function ProductCard({ p }) {
    return (
        <div className="card mb-3 hoverable" style={{ height: "500px" }}>
            <Badge.Ribbon text={`${p?.sold} sold`} color="red">
                <Badge.Ribbon
                    text={`${
                        p?.quantity >= 1
                            ? `${p?.quantity - p?.sold} in stock`
                            : "Out of stock"
                    }`}
                    placement="start"
                    color="green"
                >
                    <img
                        className="card-img-top"
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name}
                        style={{ height: "300px", objectFit: "cover" }}
                    />
                </Badge.Ribbon>
            </Badge.Ribbon>

            <div className="card-body">
                <h5>{p?.name}</h5>
                <h4 className="fw-bold">
                    {p?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </h4>
                <p className="card-text">
                    {p?.description?.substring(0, 60)}...
                </p>
            </div>

            {/* <p>{moment(p.createdAt).fromNow()}</p>
            <p>{p.sold} sold</p> */}
            <div className="d-flex justify-content-bewteen">
                <button
                    className="btn btn-primary col card-button"
                    style={{ borderBottomLeftRadius: "5px" }}
                >
                    View Product
                </button>
                <button
                    className="btn btn-outline-primary col card-button"
                    style={{ borderBottomRightRadius: "5px" }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
