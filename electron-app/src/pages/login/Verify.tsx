import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'dotenv/config';

if (!process.env.SERVER_URI) {
    throw new Error("SERVER_URI not set");
}

const SERVER_URI = process.env.SERVER_URI;

export function Verify() {
    const [code, setCode] = useState("");
    const history = useNavigate();

    useEffect(() => {
        if (!document.cookie.includes("token")) {
            history("/login");
        }

        async function fetchUser() {
            const token = document.cookie.split("=")[1];
            const response = await fetch(SERVER_URI + "/users/token/" + token);
            const data = await response.json();

            if (data[0].verified) {
                history("/");
            }
        }

        fetchUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = document.cookie.split("=")[1];

        const response = await fetch(SERVER_URI + "/users/verify" + token, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ verification_code: code })
        });

        const data = await response.json();

        if (data.match && !data.error) {
            history("/");
        } else {
            alert("Verification code does not match");
        };
    };

    return (
        <div className="verifyForm">
            <h1 className="verifyh1">Verify</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="code">Code</label>
                <input type="text" id="code" name="code" onChange={(e) => setCode(e.target.value)}/>
                <button type="submit">Verify</button>
            </form>
        </div>
    )
}