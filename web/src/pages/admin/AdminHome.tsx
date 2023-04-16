import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

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

interface StoredURI {
    ID: string;
    ID_users: string;
    URI: string;
    method: string;
}

export function AdminHome() {
    /**
     * @description AdminHome component
     * 
     * @returns TSX.Element
     */
    const [uri, setUri] = useState<StoredURI[]>([]);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<Results[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const history = useNavigate();

    const token = document.cookie.split("=")[1];

    async function CheckIfAdmin() {
        /**
         * @description Checks if the user is an admin
         */
        const response = await fetch(SERVER_URI + "/users/token/" + token);
        const data = await response.json();

        if (data.result.isAdmin == 0) {
            history("/login");
        }
    };

    async function fetchStoredUriCount() {
        /**
         * @description Fetches the amount of stored URIs
         */
        const response = await fetch(SERVER_URI + "/stored_uris/");
        const data = await response.json();

        console.log(data);

        if (!data.error) {
            const mappedUri = data.map((x: StoredURI) => {
                return {
                    ID: x.ID,
                    ID_users: x.ID_users,
                    URI: x.URI,
                    method: x.method
                }
            });

            setUri(mappedUri);
        } else {
            alert("Something happened, try again later");
        };
    }

    async function fetchUserList() {
        /**
         * @description Fetches the list of users
         */
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
        /**
         * @description Searches for users
         */
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
            <Header />
            <div className="admin-home">
                <h1>Admin</h1>
                <div className="uriCount">
                    <h2>Total Stored URI Count</h2>
                    <p>{uri.length}</p>
                </div>

                <div className="links">
                    <form onSubmit={searchUsers}>
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                        <button type="submit">Search</button>
                    </form>

                    <div className="search-results">
                    {results.map((x) => 
                        <div className="result">
                            <Link style={{textDecoration: 'none'}} to={"/admin/user/?id=" + x.id}>{x.username}</Link>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}