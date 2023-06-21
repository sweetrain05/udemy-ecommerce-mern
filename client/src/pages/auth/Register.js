import { useState } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
    // state
    const [name, setName] = useState("Danbi");
    const [email, setEmail] = useState("ddd@gmail.com");
    const [password, setPassword] = useState("hihihi");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/register`, {
                name,
                email,
                password,
            });
            console.log(data);

            if (data?.error) {
                toast.error(data.error);
            } else {
                localStorage.setItem("auth", JSON.stringify(data));
                setAuth({ ...auth, user: data.user, token: data.token });
                toast.success("Registration successful");
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
            toast.error("Registration failed. Try again.");
        }
    };

    return (
        <div>
            <Jumbotron title="Register" />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="form-control mb-4 p-2"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                            <input
                                type="email"
                                className="form-control mb-4 p-2"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                            <input
                                type="password"
                                className="form-control mb-4 p-2"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
