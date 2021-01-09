import React, {useEffect, useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import {Container, Row, Col, ProgressBar} from "react-bootstrap";

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
                        <ProgressBar className="animation_progress_bar" now={testInfo.percent} label={`${testInfo.percent}%`} />
                    </Col>
                </Row>
            </Container>
            }
        </main>,
        <Footer key={2}/>
    ]);
}

export default FinishTest;