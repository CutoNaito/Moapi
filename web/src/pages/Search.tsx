import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
            const response = await fetch('http://localhost:4000/users');
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
            <h1>Search</h1>
            <form onSubmit={searchUsers}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <button type="submit">Search</button>
            </form>
            <ul>
                {results.map((x) => 
                    <li>
                        <Link to={"/userpage/?id=" + x.id}>{x.username}</Link>
                    </li>
                )}
            </ul>
            <Footer />
        </div>
    );
}
