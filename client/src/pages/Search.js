import Jumbotron from "../components/cards/Jumbotron";
import { useSearch } from "../context/search";
import ProductCard from "../components/cards/ProductCard";

export default function Search() {
    const [values, setValues] = useSearch();

    return (
        <>
            <Jumbotron
                title="Search results"
                subTitle={
                    values?.results?.length > 0
                        ? `Found ${values?.results?.length} products`
                        : `No product found`
                }
            />
            <div className="container mt-3">
                <div className="row">
                    {values?.results?.map((p) => (
                        <div key={p._id} className="col-md-3">
                            <ProductCard p={p} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
