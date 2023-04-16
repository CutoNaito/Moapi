import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import env from "react-dotenv";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = env.SERVER_URI;

export function AdminUserUpdate() {
    /**
     * @description AdminUserUpdate component
     * 
     * @returns TSX.Element
     */
    const history = useNavigate();
    const [searchParams] = useSearchParams();
    const userID = searchParams.get("id");
    const [username, setUsername] = useState("");

    const [usernameEdit, setUsernameEdit] = useState("");
    const [passwordEdit, setPasswordEdit] = useState("");
    const [emailEdit, setEmailEdit] = useState("");
    const [verifiedEdit, setVerifiedEdit] = useState(false);

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

    async function updateUser(e: React.FormEvent<HTMLFormElement>) {
        /**
         * @description Updates a user in the database
         */
        e.preventDefault();

        const response = await fetch(SERVER_URI + `/users/${userID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.AUTH_TOKEN
            },
            body: JSON.stringify({
                username: usernameEdit,
                password: passwordEdit,
                email: emailEdit,
                verified: verifiedEdit
            })
        });

        const data = await response.json();

        if (data.error) {
            alert("Something went wrong, try again later");
        } else {
            history(`/admin/user/?id=${userID}`);
        };
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <Header />
            <div className="admin-user-update">
                <h1>Update {username}</h1>
                <form onSubmit={updateUser}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" onChange={
                        (e) => {
                            setUsernameEdit(e.target.value);
                        }
                    } />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={
                        (e) => {
                            setPasswordEdit(e.target.value);
                        }
                    } />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={
                        (e) => {
                            setEmailEdit(e.target.value);
                        }
                    } />

                    <label htmlFor="verified">Verified</label>
                    <input type="checkbox" name="verified" id="verified" onChange={
                        (e) => {
                            setVerifiedEdit(e.target.checked);
                        }
                    } />

                    <button type="submit">Update</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}