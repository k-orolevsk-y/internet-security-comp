import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import {Form, Col, Row, Container} from "react-bootstrap";
import API from "../API";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import "../Styles/Tests.css";

const Tests = () => {
    let testId = useParams().id;

    useEffect(() => {
        document.title = "Безопасность | Проверка знаний"

        let r = API.sendRequest('user.get', { id: testId });
        console.log(r)
    }, [testId]);

    return([
        <Header key={0}/>,
        <main key={1}>
            <Container>
                <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={5}>
                        Тестовый вопрос, тестового типа для тестовых пользователей.
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Check
                            type="radio"
                            label="Тестовый ответ 1"
                            name="test"
                            id="test1"
                        />
                        <Form.Check
                            type="radio"
                            label="Тестовый ответ 2"
                            name="test"
                            id="test2"
                        />
                        <Form.Check
                            type="radio"
                            label="Тестовый ответ 3"
                            name="test"
                            id="test3"
                        />
                    </Col>
                </Form.Group>
            </Container>
        </main>,
        <Footer key={2}/>
    ]);
}

export default Tests;