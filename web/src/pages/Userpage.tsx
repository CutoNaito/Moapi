import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import env from "react-dotenv";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = env.SERVER_URI;

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
    const [favoriteHistory, setFavoriteHistory] = useState<string[]>([]);

    const fetchUser = async () => {
        const response = await fetch(SERVER_URI + `/users/${userID}`);
        const data = await response.json();

        if (data.error) {
            history("/");
        };

        setUsername(data.username);
    };

    const fetchRequestHistory = async () => {
        const response = await fetch(SERVER_URI + `/stored_uris/user/${userID}`);
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

    const fetchFavoriteHistory = async () => {
        const response = await fetch(SERVER_URI + `/favorites/user/${userID}`);
        const data = await response.json();

        if (data.error) {
            setFavoriteHistory([]);
        };

        const URIs = data.map((x: Stored_URIs) => {
            return x.URI;
        });

        setFavoriteHistory(URIs);
    };

    useEffect(() => {
        fetchUser();
        fetchRequestHistory();
        fetchFavoriteHistory();
    }, []);

    return (
        <div>
            <Header />
            <div className="userpage">
                <h1>{username}</h1>

                <div className="navbars">
                    <nav className="history-navbar">
                        <ul>
                            {requestHistory.map((x) =>
                                <li>
                                    {x}
                                </li>
                            )}
                        </ul>
                    </nav>

                    <nav className="favorite-navbar">
                        <ul>
                            {favoriteHistory.map((x) =>
                                <li>
                                    {x}
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
                
            </div>
            <Footer />
        </div>
    );
}