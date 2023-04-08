import { Link, useNavigate } from "react-router-dom";

export function Header() {
    const history = useNavigate();

    if (document.cookie.includes("token")) {
        return (
            <header>
                <h1>MOAPI</h1>
                <button>
                    <Link style={{textDecoration: 'none'}} to={"/"}>Home</Link>
                </button>

                <button onClick={() => {
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    history("/login");
                }}>
                    <a>Logout</a>
                </button>

                <button>
                    <Link style={{textDecoration: 'none'}} to={"/search"}>Search</Link>
                </button>
            </header>
        );
    } else {
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
}