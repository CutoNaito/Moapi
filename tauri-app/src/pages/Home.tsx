import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Home() {
    const [url, setUrl] = useState("");
    const [method, setMethod] = useState("");
    const [body, setBody] = useState("");
    const [bodyParsed, setBodyParsed] = useState({});
    const [response, setResponse] = useState("");

    const history = useNavigate();

    useEffect(() => {
        if (!document.cookie.includes("token")) {
            history("/login");
        } else {
            console.log("You are logged in");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (body !== "") {
            try {
                setBodyParsed(JSON.parse(body));
            } catch (error) {
                setResponse("Invalid JSON");
            }
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyParsed)
        })

        const data = await response.json();

        setResponse(JSON.stringify(data));
    }

    return (
        <div className="home">
            <Header />
            <form onSubmit={handleSubmit}>
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
                <textarea placeholder="Body" onChange={(e) => setBody(e.target.value)}></textarea>
                <button type="submit">Send</button>
                <p>{response}</p>
            </form>
            <Footer />
        </div>
    );
}