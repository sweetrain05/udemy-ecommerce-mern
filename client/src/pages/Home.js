import Jumbotron from "../components/cards/Jumbotron";
import { AuthContext } from "../context/auth";
import { useContext } from "react";

export default function Home() {
    const [auth, setAuth] = useContext(AuthContext);

    return (
        <div>
            <Jumbotron
                title="Hello World"
                subTitle="Welcome to React E-commerce"
            />
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </div>
    );
}
