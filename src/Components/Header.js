import {Container, Nav, Navbar} from "react-bootstrap";
import React from "react";
import {Icon28LogoInstagram, Icon28LogoVkOutline, Icon28PincodeLockOutline} from "@vkontakte/icons";
import {NavLink, useHistory} from "react-router-dom";

import "../Styles/Header.css";

const Header = () => {

    const history = useHistory();

    return(
        <header style={{ marginBottom: "8.5rem" }}>
            <Navbar collapseOnSelect variant="dark" bg="primary" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand
                        onClick={() => { history.push("/") }}
                        style={{ cursor: "pointer" }}
                    >
                        <Icon28PincodeLockOutline/>
                        Безопасность
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="collapse"/>
                    <Navbar.Collapse id="collapse">
                        <Nav className="mx-auto order-0 text-center">
                            {localStorage.getItem("user") !== null &&
                                <>
                                    <Nav.Item className="link-header">
                                        <Nav.Link as={NavLink} to="/choiceTest">Проверь себя</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="link-header">
                                        <Nav.Link as={NavLink} to="/choiceInfo">Статьи</Nav.Link>
                                    </Nav.Item>
                                </>
                            }
                            <Nav.Item className="link-header">
                                <Nav.Link active={false} href="tel:8-800-2000-122">Персональная помощь</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    {
                        window.innerWidth >= 961 &&
                        <Nav>
                            <Nav.Item>
                                <Nav.Link active={false} role="link" target="_blank" href="https://vk.com/security"><Icon28LogoVkOutline width={28} height={28}/></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link active={false} target="_blank" href="https://ru-ru.facebook.com/help/instagram/369001149843369"><Icon28LogoInstagram width={28} height={28}/></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    }
                </Container>
            </Navbar>
        </header>
    );

}

export default Header;