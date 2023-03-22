import { useState ,useEffect } from "react";
import 'dotenv/config';

if (!process.env.SERVER_URI) {
    throw new Error("SERVER_URI not set");
}

const SERVER_URI = process.env.SERVER_URI;

export function HistoryPanel() {
    const [user_id, setUser_id] = useState("");
    const [history, setHistory] = useState([{
        ID: "",
        URI: "",
        user_id: ""
    }]);

    useEffect(() => {
        async function fetchUsername() {
            const token = document.cookie.split("=")[1];
            const response = await fetch(SERVER_URI + "/users/token/" + token);
            const data = await response.json();
            
            setUser_id(data[0].ID);

            const historyFetch = await fetch(SERVER_URI + "/stored_uris/user_id/" + user_id);
            const historyData = await historyFetch.json();

            setHistory(historyData);
        }

        fetchUsername();
    }, []);

    return (
        <div className="historyPanel">
            <h1>History</h1>
            <ul>
                {history.map((item) => (
                    <li key={item.ID}>
                        <p>{item.URI}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}