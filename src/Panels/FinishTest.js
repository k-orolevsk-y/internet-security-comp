import React, {useEffect, useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import {Container, Row, Col, ProgressBar, OverlayTrigger, Tooltip, Card, Button} from "react-bootstrap";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import API from "../Tests/API";

import "../Styles/FinishTest.css";


const FinishTest = () => {
    const [testInfo, setTestInfo] = useState(null);

    let params = useParams();
    let history = useHistory();

    useEffect(() => {
        document.title = "Безопасность | Завершение теста"

        const testStorageInfo = JSON.parse(localStorage.getItem("test-"+params.testId.toString()));
        if(testStorageInfo === null) {
            history.push("/");
            return;
        }

        const test = API.getTest(parseInt(params.testId));
        if(test === null) {
            history.push("/");
            return;
        }

        setTestInfo({
            rights: testStorageInfo.rights,
            wrongs: testStorageInfo.wrongs,
            percent: parseInt((100 / test.questions.length) * testStorageInfo.rights),
            test: test
        });
    }, [history, params]);

    return([
        <Header key={0}/>,
        <main key={1}>
            {testInfo &&
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <h2>Спасибо за прохождение теста!<br/>Давайте подведем результаты:</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <OverlayTrigger
                            overlay={
                                <Tooltip id="progressbar">
                                    Этот прогресс бар показывает то, насколько Вы выполнили тест в процентах.
                                </Tooltip>
                            }
                            placement={
                                testInfo.percent < 35 ? "bottom-start" : (testInfo.percent < 75 ? "bottom" : "bottom-end")
                            }
                        >
                            <ProgressBar className="animation_progress_bar" className={testInfo.percent === 0 && "progress_bar_zero"} now={testInfo.percent} label={`${testInfo.percent}%`} />
                        </OverlayTrigger>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="text-center">
                        <Card>
                            <Card.Header className="text-center">{testInfo.rights.toString() + " / " + testInfo.test.questions.length.toString()}</Card.Header>
                            <Card.Body
                                dangerouslySetInnerHTML={{__html:
                                    testInfo.percent <= 25 ? testInfo.test.infoFinish[0] :
                                    testInfo.percent <= 50 ? testInfo.test.infoFinish[1] :
                                    testInfo.percent <= 75 ? testInfo.test.infoFinish[2] :
                                    testInfo.test.infoFinish[3]
                                }}
                            />
                        </Card>
                        <Button
                            className="mt-5"
                            onClick={() => {
                                history.push('')
                            }}
                        >
                            Перейти к изучению информации
                        </Button>
                    </Col>
                </Row>
            </Container>
            }
        </main>,
        <Footer key={2}/>
    ]);
}

export default FinishTest;