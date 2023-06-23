import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminCategory() {
    // context
    const [auth, setAuth] = useAuth();

    // state
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/category", { name });
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.name}" is created`);
                setName("");
            }
        } catch (err) {
            console.log(err);
            toast.error("Create category failed. Try again.");
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.name}`}
                subTitle="Admin Dashboard"
            />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Manage Categories
                        </div>
                        <div className="p-3">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className="form-control p-3"
                                    value={name}
                                    placeholder="Write category name"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                                <button className="btn btn-primary mt-3">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
