import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { UserConfigHUD } from "../../components/admin/UserConfigHUD";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = env.SERVER_URI;

export function AdminUser() {
    /**
     * @description AdminUser component
     * 
     * @returns TSX.Element
     */
    const history = useNavigate();
    const [searchParams] = useSearchParams();
    const userID = searchParams.get("id");

    const [username, setUsername] = useState("");

    const token = document.cookie.split("=")[1];

    if (userID === null) {
        history("/");
    };

    async function CheckIfAdmin() {
        /**
         * @description Checks if the user is an admin
         */
        const response = await fetch(SERVER_URI + "/users/token/" + token);
        const data = await response.json();

        if (data.result.isAdmin == 0) {
            history("/login");
        };
    };

    async function fetchUser() {
        /**
         * @description Fetches a user from the database
         */
        const response = await fetch(SERVER_URI + `/users/${userID}`);
        const data = await response.json();

        if (data.error) {
            history("/");
        };

        setUsername(data.username);
    }

    useEffect(() => {
        if (!token) {
            history("/login");
        };

        CheckIfAdmin();
        fetchUser();
    }, []);

    return (
        <div className="admin-user">
            <h1>{username}</h1>
            <div className="config_hud">
                <UserConfigHUD userID={userID} />
            </div>
        </div>
    );
}