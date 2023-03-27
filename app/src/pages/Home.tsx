import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HistoryPanel } from "../components/HistoryPanel";
import JsonFormatter from "react-json-formatter";
import env from "react-dotenv";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = env.SERVER_URI;

export function Home() {
    const [url, setUrl] = useState("");
    const [user_id, setUser_id] = useState("");
    const [method, setMethod] = useState("");
    const [body, setBody] = useState("");
    const [bodyParsed, setBodyParsed] = useState({});
    const [response, setResponse] = useState({});

    async function fetchUsername() {
        const token = document.cookie.split("=")[1];
        const response = await fetch(SERVER_URI + "/users/token/" + token);
        const data = await response.json();
        
        if (data.error) {
            history("/login");
        }

        console.log(data.result.ID, data.result.verified);
        
        setUser_id(data.result.ID);

        if(data.result.verified == 0) {
            history("/verify");
        }
    }

    const history = useNavigate();

    const jsonStyle = {
        propertyStyle: { color: '#61005c' },
        stringStyle: { color: '#000' },
        numberStyle: { color: '#9c6e99' }
    }

    useEffect(() => {
        fetchUsername();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (method == "POST" || method == "PUT") {
            try {
                setBodyParsed(JSON.parse(body));
                
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify(bodyParsed)
                })

                if (!response.ok) {
                    setResponse({"error": response.statusText});
                } else {
                    const data = await response.json();

                    setResponse(data);

                    await fetch(SERVER_URI + "/stored_uris", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": env.AUTH_TOKEN!
                        },
                        body: JSON.stringify({
                            uri: url,
                            user_id: user_id
                        })
                    });
                }
            } catch (error) {
                setResponse({"error": error});
            }
        } else {
            const response = await fetch(url, {
                method: method
            })

            if (!response.ok) {
                setResponse({"error": response.statusText});
            } else {
                const data = await response.json();
                
                setResponse(data);

                await fetch(SERVER_URI + "/stored_uris", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": env.AUTH_TOKEN!
                    },
                    body: JSON.stringify({
                        uri: url,
                        user_id: user_id
                    })
                });
            }
        }
    }

    return (
        <div className="home">
            <Header />
            <HistoryPanel />
            <form onSubmit={handleSubmit}>
                <div className="top-row">
                    <input type="text" placeholder="URL" onChange={(e) => setUrl(e.target.value)}/>
                    <select defaultValue="Method" onChange={
                        (e) => {
                            setMethod(e.target.value);
                        }
                    }>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
                <textarea placeholder="Body" rows={15} cols={175} onChange={(e) => setBody(e.target.value)}></textarea>
                <button type="submit">Send</button>
            </form>
            <div className="response">
                <div className="formatter">
                    {response && <JsonFormatter json={JSON.stringify(response)} tabWith={4} jsonStyle={jsonStyle} />}
                </div>
            </div>
            <Footer />
        </div>
    );
}