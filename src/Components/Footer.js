import React from "react";
import {Container, Navbar} from "react-bootstrap";

const Footer = () => {

    return(
        <footer style={{ marginTop: "4.5rem" }}>
            <Navbar variant="dark" bg="primary" expand="lg" fixed="bottom">
                <Container>
                    <a href="https://korolevsky.me/" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "none" }} className="link-header">Разработчик</a>
                    <span style={{ color: "white" }}>&copy; {new Date().getFullYear()}</span>
                </Container>
            </Navbar>
        </footer>
    );
}

export default Footer;