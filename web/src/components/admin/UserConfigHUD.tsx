import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import env from "react-dotenv";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = env.SERVER_URI;

interface UserProps {
    userID: string | null;
}

export function UserConfigHUD(props: UserProps) {
    async function DeleteUser() {
        const response = await fetch(SERVER_URI + `/users/${props.userID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.AUTH_TOKEN
            }
        });

        const data = await response.json();

        if (data.error) {
            console.log(data.error);
        };
    };

    return (
        <div>
            <button><Link to={`/admin/user/update/?id=${props.userID}`}>Update User</Link></button>
            <button onClick={DeleteUser}>Delete User</button>
        </div>
    );
}