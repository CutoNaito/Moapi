import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import env from "react-dotenv";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = env.SERVER_URI;

interface User {
    ID: string;
    username: string;
    password: string;
    email: string;
    token: string;
    verified: number;
    verification_code: string;
}

type Results = {
    username: string;
    id: string;
}

export function AdminHome() {
    const [uriCount, setUriCount] = useState(0);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<Results[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const history = useNavigate();

    const token = document.cookie.split("=")[1];

    async function CheckIfAdmin() {
        const response = await fetch(SERVER_URI + "/users/token/" + token);
        const data = await response.json();

        if (data.result.isAdmin == 0) {
            history("/login");
        }
    };

    async function fetchStoredUriCount() {
        const response = await fetch(SERVER_URI + "/stored_uris/count/");
        const data = await response.json();

        if (!data.error) {
            console.log(data);
            setUriCount(data.result[0]);
        } else {
            alert("Something happened, try again later");
        };
    }

    async function fetchUserList() {
        const response = await fetch(SERVER_URI + "/users/");
        const data = await response.json();

        if (!data.error) {
            setUsers(data.result);
        } else {
            alert("Something happened, try again later");
        };
    }
    
    useEffect(() => {
        if (!token) {
            history("/login");
        };

        CheckIfAdmin();
        fetchUserList();
        fetchStoredUriCount();
    }, []);

    const searchUsers = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const mappedUsers = users.map((x: User) => {
            return {
                username: x.username,
                id: x.ID
            }
        });

        const filteredUsers = mappedUsers.filter((x: Results) => 
            x.username.toLowerCase().includes(search.toLowerCase())
        );

        setResults(filteredUsers);
    }

    return (
        <div>
            <h1>Admin</h1>
            <div className="uriCount">
                <h2>Stored URI Count</h2>
                <p>{uriCount}</p>
            </div>
            <div className="links">
                <form onSubmit={searchUsers}>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
                <ul>
                    {results.map((x) => 
                        <li>
                            <Link to={"/admin/user/?id=" + x.id}>{x.username}</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}