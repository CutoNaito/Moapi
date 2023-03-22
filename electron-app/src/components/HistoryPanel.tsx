import { useState ,useEffect } from "react";

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
            const response = await fetch("http://37.120.169.246/users/token/" + token);
            const data = await response.json();
            
            setUser_id(data[0].ID);

            const historyFetch = await fetch("http://37.120.169.246/stored_uris/user_id/" + user_id);
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