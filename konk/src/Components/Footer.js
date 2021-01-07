import React from "react";
import {Container, Navbar} from "react-bootstrap";

const Footer = () => {

    return(
        <footer>
            <Navbar variant="dark" bg="primary" expand="lg" fixed="bottom">
                <Container>
                    <a href="https://korolevsky.me/" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "none" }} className="link-header">Разработчик</a>
                </Container>
            </Navbar>
        </footer>
    );
}

export default Footer;