import React, {useEffect} from "react";
import {Button, Container, Row} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import "../Styles/Main.css";

const Main = () => {
    const history = useHistory();

    useEffect(() => {
        let user = localStorage.getItem("user");
        if(user !== undefined || user !== null) {
            history.push('/test/1');
            return;
        }

        document.title = "Безопасность | Главная"
        setTimeout(() => {
            let e = document.getElementsByClassName("containerTitle")[0];
            if(e !== undefined) {
                e.style.display = "none";
            }
        }, 8500);
    }, []);

    return([
        <Header key={0}/>,
        <main key={1}>
            <Container fluid className="nextTextContainer">
                <h2 style={{ textAlign: "center", fontSize: 96 }}>Кто же ты?</h2>
                <Row className="justify-content-center">
                    <Button
                        size="lg"
                        className="btn-1"
                        onClick={() => {
                            localStorage.setItem("user", "parent");
                            history.push('/test/1');
                        }}
                    >
                        Я родитель
                    </Button>
                    <Button
                        size="lg"
                        className="btn-2"
                        onClick={() => {
                            localStorage.setItem("user", "baby");
                            history.push('/test/1');
                        }}
                    >
                        Я ребёнок
                    </Button>
                </Row>
            </Container>
            <section className="containerTitle">
                <h1 className="title title1">
                    <span>Привет, друг!</span>
                    <span>Ты наверное хочешь поговорить</span>
                    <span>о безопасности?</span>
                </h1>
                <h2 className="title title2">
                    <span>Безопасность в интернете</span>
                    <span>в наши годы очень важна</span>
                    <span>и я обязан рассказать тебе о ней!</span>
                </h2>
            </section>
        </main>,
        <Footer key={2}/>
    ]);

}

export default Main;