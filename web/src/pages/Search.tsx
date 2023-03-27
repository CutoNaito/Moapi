import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";

interface User {
    ID: string;
    username: string;
    password: string;
    email: string;
    token: string;
    verified: number;
    verification_code: string;
}

export function Search() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:4000/users');
            const data = await response.json();

            const usernames: string[] = [];

            data.forEach((x: User) => {
                usernames.push(x.username);
            });

            setResults(usernames);
        }

        fetchUsers();
    }, []);

    return (
        <div className="search">
            <Header />
            <h1>Search</h1>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <ul>
                {results.map((x) => 
                    <li>{x}</li>
                )}
            </ul>
            <Footer />
        </div>
    );
}
