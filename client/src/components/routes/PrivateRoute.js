import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

export default function PrivateRoute() {
    // context
    const [auth, setAuth] = useAuth();

    // state
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            try {
                const { data } = await axios.get(`/auth-check`);
                if (data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (auth?.token) authCheck();
    }, [auth?.token]);

    // useEffect(() => {
    //     if (auth?.token) {
    //         setOk(true);
    //     } else {
    //         setOk(false);
    //     }
    // }, [auth?.token]);

    return ok ? <Outlet /> : <Loading />;
}

// 그냥 auth.token의 true/false를 이용해서 outlet을 보여줄지 말지를 정하면 되는데
// 왜 별도의 ok state을 만들어서 적용한건지?
// return auth.token ? <Outlet /> : "Loading..."; 를 해도 동일하게 작동함.
