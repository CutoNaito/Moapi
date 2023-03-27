import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <header>
            <h1>MOAPI</h1>
            <Button variant="secondary">
                <Link to={"/"}>Home</Link>
            </Button>

            <Button variant="secondary">
                <Link to={"/login"}>Login</Link>
            </Button>
        </header>
    );
}