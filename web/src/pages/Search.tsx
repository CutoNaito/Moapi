import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export function Search() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<Results[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(SERVER_URI + '/users');
            const data = await response.json();

            setUsers(data.result);
        }

        fetchUsers();
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
        <div className="search">
            <Header />
            <form onSubmit={searchUsers}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <button type="submit">Search</button>
            </form>
            <div className="search-results">
                {results.map((x) => 
                    <div className="result">
                        <Link style={{textDecoration: 'none'}} to={"/userpage/?id=" + x.id}>{x.username}</Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
