import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import env from "react-dotenv";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = env.SERVER_URI;

export function AdminUser() {
    const history = useNavigate();
    const [searchParams] = useSearchParams();
    const userID = searchParams.get("id");

    if (userID === null) {
        history("/");
    };

    async function fetchUser() {
        const response = await fetch(SERVER_URI + "/users/");
        const data = await response.json();

        if (data.result[0].isAdmin == 0) {
            history("/login");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="admin-user">
            <h1>Admin User</h1>
        </div>
    );
}