import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function Userpage() {
    const history = useNavigate();
    const [searchParams] = useSearchParams();
    const userID = searchParams.get("id");

    if (userID === null) {
        history("/");
    };

    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:4000/users/${userID}`);
            const data = await response.json();

            if (data.error) {
                history("/");
            };

            setUsername(data.username);
        };

        fetchUser();
    }, []);

    return (
        <div className="userpage">
            <Header />
            <h1>{username}</h1>
            <Footer />
        </div>
    );
}