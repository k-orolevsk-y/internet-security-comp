import {Container, Nav, Navbar} from "react-bootstrap";
import React from "react";
import {Icon28LogoInstagram, Icon28LogoVkOutline, Icon28PincodeLockOutline} from "@vkontakte/icons";
import {NavLink} from "react-router-dom";

import "../Styles/Header.css";

const Header = () => {

    return(
        <header>
            <Navbar collapseOnSelect variant="dark" bg="primary" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="/"><Icon28PincodeLockOutline/>Безопасность</Navbar.Brand>
                    <Navbar.Toggle aria-controls="collapse"/>
                    <Navbar.Collapse id="collapse">
                        <Nav className="mx-auto order-0 text-center">
                            <Nav.Item className="link-header">
                                <Nav.Link active={window.location.href.split("/").pop() === "active"} as={NavLink} to="/advice">Советы</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="link-header">
                                <Nav.Link active={window.location.href.split("/").pop() === "errors"} as={NavLink} to="/errors">Ошибки</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    {
                        window.innerWidth >= 961 &&
                        <Nav>
                            <Nav.Item>
                                <Nav.Link active={false} role="link" target="_blank" href="https://vk.com/security"><Icon28LogoVkOutline/></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link active={false} target="_blank" href="https://ru-ru.facebook.com/help/instagram/369001149843369"><Icon28LogoInstagram/></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    }
                </Container>
            </Navbar>
        </header>
    );

}

export default Header;