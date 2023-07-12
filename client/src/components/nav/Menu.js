import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";

export default function Menu() {
    //context
    const [auth, setAuth] = useAuth();

    //hooks
    const categories = useCategory();
    const navigate = useNavigate();

    const logout = () => {
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        navigate("/login");
    };

    return (
        <>
            <ul className="nav d-flex justify-content-between shadow-sm mb-2">
                <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                        HOME
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/shop"
                    >
                        SHOP
                    </NavLink>
                </li>

                <div className="dropdown">
                    <li>
                        <a
                            className="nav-link pointer dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            Categories
                        </a>
                        <ul
                            className="dropdown-menu"
                            style={{ height: "300px", overflowY: "scroll" }}
                        >
                            <li>
                                <NavLink
                                    className="nav-link"
                                    to={`/categories`}
                                >
                                    All Categories
                                </NavLink>
                            </li>
                            {categories?.map((c) => (
                                <li key={c._id}>
                                    <NavLink
                                        className="nav-link"
                                        to={`/category/${c.slug}`}
                                    >
                                        {c.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </li>
                </div>

                <Search />

                {auth?.user ? (
                    <div className="dropdown">
                        <li>
                            <a
                                className="nav-link pointer dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                {auth?.user?.name}
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <NavLink
                                        className="nav-link"
                                        to={`/dashboard/${
                                            auth?.user?.role === 1
                                                ? "admin"
                                                : "user"
                                        }`}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <a
                                        onClick={logout}
                                        className="nav-link pointer"
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </div>
                ) : (
                    <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                LOGIN
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register">
                                REGISTER
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </>
    );
}
