import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import JsonFormatter from "react-json-formatter";

export function Home() {
    const [url, setUrl] = useState("");
    const [method, setMethod] = useState("");
    const [body, setBody] = useState("");
    const [bodyParsed, setBodyParsed] = useState({});
    const [response, setResponse] = useState({});

    const history = useNavigate();

    const jsonStyle = {
        propertyStyle: { color: '#61005c' },
        stringStyle: { color: '#000' },
        numberStyle: { color: '#9c6e99' }
    }

    useEffect(() => {
        if (!document.cookie.includes("token")) {
            history("/login");
        } else {
            console.log("You are logged in");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (method == "POST" || method == "PUT") {
            try {
                setBodyParsed(JSON.parse(body));
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bodyParsed)
                })

                if (!response.ok) {
                    setResponse({"error": response.statusText});
                } else {
                    const data = await response.json();
                    setResponse(data);
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
            }
        }
    }

    return (
        <div className="home">
            <Header />
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