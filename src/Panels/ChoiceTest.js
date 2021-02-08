import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {Col, Container, ListGroup, Row} from "react-bootstrap";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import TestsAPI from "../API/TestsAPI";


const ChoiceTest = () => {
    const [test, setTest] = useState(null);
    const [user, setUser] = useState(null);

    let history = useHistory();

    useEffect(() => {
        document.title = "Безопасность | Тесты"

        let user = localStorage.getItem("user");
        if(user == null) {
            history.push('/');
            return;
        }

        const testResponse = TestsAPI.tests;
        setUser(user);
        setTest(testResponse);
    }, [ history ]);

    return([
        <Header key={0}/>,
        <main key={1} style={{ paddingTop: "3%" }}>
            {test &&
            <div
                style={{
                    padding: "1% 0"
                }}
            >
                <h1 className="text-center mb-5" style={ window.innerWidth < 961 ? { fontSize: "18px" } : {}}>Выберите интересующий тест:</h1>
                <Container>
                    <Row>
                        { window.innerWidth >= 961 && <Col/> /* specially to make the list look normal on pc */ }
                        <Col>
                            <ListGroup>
                                {Object.keys(test).map((key, index) => {
                                    if(test[key].whom !== "all" && test[key].whom !== user.toString()) {
                                        key-=1;
                                        return null;
                                    }

                                    return(
                                        <ListGroup.Item
                                            key={index}
                                            as="button"
                                            active={true}
                                            className="mb-3 text-center"
                                            style={{
                                                borderRadius: "20px"
                                            }}
                                            onClick={() => {
                                                history.push('/test/'+key.toString()+"#greeting")
                                            }}
                                        >
                                            {test[key].name}
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        </Col>
                        { window.innerWidth >= 961 && <Col/> }
                    </Row>
                </Container>
            </div>
            }
        </main>,
        <Footer key={2}/>
    ]);
}

export default ChoiceTest;