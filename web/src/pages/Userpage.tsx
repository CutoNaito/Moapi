import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Stored_URIs {
    ID: string;
    ID_user: string;
    URI: string;
}

export function Userpage() {
    const history = useNavigate();
    const [searchParams] = useSearchParams();
    const userID = searchParams.get("id");

    if (userID === null) {
        history("/");
    };

    const [username, setUsername] = useState("");
    const [requestHistory, setRequestHistory] = useState<string[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:4000/users/${userID}`);
            const data = await response.json();

            if (data.error) {
                history("/");
            };

            setUsername(data.username);
        };

        const fetchRequestHistory = async () => {
            const response = await fetch(`http://localhost:4000/stored_uris/user/${userID}`);
            const data = await response.json();

            console.log(data);
            
            if (data.error) {
                setRequestHistory([]);
            };

            const URIs = data.map((x: Stored_URIs) => {
                return x.URI;
            });

            setRequestHistory(URIs);
        };

        fetchUser();
        fetchRequestHistory();
    }, []);

    return (
        <div className="userpage">
            <Header />
            <h1>{username}</h1>
            <ul>
                {requestHistory.map((x) =>
                    <li>
                        {x}
                    </li>
                )}
            </ul>
            <Footer />
        </div>
    );
}