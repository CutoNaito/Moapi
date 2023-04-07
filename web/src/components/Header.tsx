import { Link } from "react-router-dom";

export function Header() {
    return (
        <header>
            <h1>MOAPI</h1>
            <button>
                <Link style={{textDecoration: 'none'}} to={"/"}>Home</Link>
            </button>

            <button>
                <Link style={{textDecoration: 'none'}} to={"/login"}>Login</Link>
            </button>

            <button>
                <Link style={{textDecoration: 'none'}} to={"/register"}>Register</Link>
            </button>

            <button>
                <Link style={{textDecoration: 'none'}} to={"/search"}>Search</Link>
            </button>
        </header>
    );
}