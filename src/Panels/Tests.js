import React, {useEffect, useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import {Form, Container, Button, Row, Col, Image, Modal} from "react-bootstrap";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import TestsAPI from "../API/TestsAPI";

const Tests = () => {
    const [test, setTest] = useState({});
    const [question, setQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [showCorrect, setShowCorrect] = useState(false);
    const [testPassed, setTestPassed] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);

    let params = useParams();
    let history = useHistory();


    useEffect(() => {
        document.title = "Безопасность | Проверка знаний"

        let user = localStorage.getItem("user");
        if(user == null) {
            history.push('/');
            return;
        }

        const testResponse = TestsAPI.getTest(parseInt(params.testId));
        if(testResponse !== null) {
            if(testResponse.whom === user) {
                setTest(testResponse);
            } else {
                // specially, so that the inscription does not flash that such a test does not exist
                setTest(null);
            }

            if(params.question !== undefined) {
                let num = (parseInt(params.question)) - 1;
                if(num < 0 || isNaN(num) || testResponse.questions[num] === undefined) num = 0;

                setQuestion(num);
            }

            let testStorageInfo = JSON.parse(localStorage.getItem("test-"+testResponse.id.toString()));
            if(testStorageInfo !== null && typeof(testStorageInfo) != "undefined") {
                if(testStorageInfo.passed) {
                    setTestPassed(true);
                    return;
                }

                if(testStorageInfo.questionsCompleted.indexOf(question.toString()) !== -1) {
                    if(testResponse.questions[(question+1)] === undefined) {
                        setTest({}); // specifically to prevent the test from appearing on redirect
                        history.push('/finishTest/'+testResponse.id.toString());
                    } else {
                        setTest({}); // specifically to prevent the test from appearing on redirect
                        history.push('/test/'+testResponse.id.toString()+'/'+(question+2).toString());
                    }
                }
            } else if(question >= 1) {
                window.location.href = '/test/'+testResponse.id.toString();
            }
        } else {
            // specially, so that the inscription does not flash that such a test does not exist
            setTest(null);
        }
    }, [params, history, question]);

    return([
        <Header key={0}/>,
        <main key={1}>
            {testPassed ?
                <Container className="text-center">
                    <Row>
                        <Col>
                            <h2 className="mb-4">Вы уже прошли данный тест, хотите пройти его ещё раз?</h2>
                            <Button
                                onClick={() => {
                                    localStorage.removeItem("test-"+params.testId.toString());
                                    history.push('/test/'+params.testId.toString()+"#greeting");
                                    setTestPassed(false);
                                }}
                                size="lg"
                                style={window.innerWidth >= 961 ? { width: "15%" } : {}}
                            >
                                Да
                            </Button>
                            <Button
                                onClick={() => {
                                    history.push('/choiceTest');
                                }}
                                size="lg"
                                style={ window.innerWidth >= 961 ? { width: "15%", marginLeft: "3%" } : { marginLeft: "3%" }}
                            >
                                Нет
                            </Button>
                        </Col>
                    </Row>
                </Container>
                : test === null ?
                <Container className="text-center">
                    <Row>
                        <Col>
                            <h2 className="mb-4">Тест не найден!</h2>
                            <Button
                                onClick={() => {
                                    history.push('/');
                                }}
                            >
                                Вернуться на главную
                            </Button>
                        </Col>
                    </Row>
                </Container>
            :
                window.location.hash === "#greeting" && ( typeof(test.greeting) != "undefined" && test.greeting !== null ) ?
                    <Container className="text-center">
                        <h2 className="mb-4" dangerouslySetInnerHTML={{__html: test.greeting}}/>
                        <Button
                            onClick={() =>
                                history.push('/test/'+params.testId.toString())
                            }
                        >
                            Перейти к тесту
                        </Button>
                    </Container>
                    :
                    <Container>
                        {test.questions && <div className="text-center">
                                <h2 className="mb-4" style={window.innerWidth < 961 ? { fontSize: "16px" } : {}}>
                                    {test.questions[question].title}
                                    {test.questions[question].img && <i style={{ fontSize: "16px", color: "gray" }}><br/>(У данного вопроса есть изображение)</i>}
                                </h2>
                                {test.questions.map((quest, key) => {
                                    if(key === question) {
                                        const form = (
                                            <Form key={question}>
                                                <Form.Group>
                                                    {quest.answers.map((item, key2) => {
                                                        if(key2 === quest.rightAnswer) {
                                                            return(
                                                                <Form.Check
                                                                    id={"answer-"+key2.toString()}
                                                                    name={"test-"+question.toString()}
                                                                    key={key2}
                                                                    type="radio"
                                                                    label={item}
                                                                    onClick={() => setSelectedAnswer(key2)}
                                                                    isValid={showCorrect}
                                                                />)
                                                        } else {
                                                            return(
                                                                <Form.Check
                                                                    id={"answer-"+key2.toString()}
                                                                    name={"test-"+question.toString()}
                                                                    key={key2}
                                                                    type="radio"
                                                                    label={item}
                                                                    onClick={() => setSelectedAnswer(key2)}
                                                                    isInvalid={showCorrect}
                                                                />)
                                                        }
                                                    })}
                                                </Form.Group>
                                            </Form>);

                                        if(quest.img !== undefined) {
                                            return([
                                                    <Modal show={showPhoto} onHide={() => setShowPhoto(false)} key={0} centered>
                                                        <Modal.Header closeButton>
                                                            Изображение связанное с вопросом
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Image src={quest.img} width="100%" fluid rounded/>
                                                        </Modal.Body>
                                                    </Modal>,
                                                    form,
                                                    <Button
                                                        disabled={showCorrect}
                                                        onClick={() => setShowPhoto(true)}
                                                        className={window.innerWidth <= 320 ? "mr-2" : "mr-3"}
                                                        key={1}
                                                    >
                                                        Изображение
                                                    </Button>
                                                ])
                                        } else {
                                            return(form)
                                        }
                                    }

                                    return null;
                                })}
                                <Button
                                    disabled={showCorrect || selectedAnswer === -1}
                                    onClick={() => {
                                        if (selectedAnswer === -1) return;

                                        let testStorageInfo = localStorage.getItem("test-" + test.id.toString());
                                        if (testStorageInfo === null || typeof (testStorageInfo) == "undefined") {
                                            testStorageInfo = JSON.stringify({
                                                rights: 0,
                                                wrongs: 0,
                                                questionsCompleted: [],
                                                passed: false
                                            });

                                            localStorage.setItem("test-" + test.id.toString(), testStorageInfo);
                                        }

                                        let newInfo = JSON.parse(testStorageInfo);
                                        if (test.questions[question].rightAnswer === selectedAnswer) {
                                            newInfo.rights += 1;
                                        } else {
                                            newInfo.wrongs += 1;
                                        }

                                        newInfo.questionsCompleted = [...newInfo.questionsCompleted, question.toString()];
                                        localStorage.setItem("test-" + test.id.toString(), JSON.stringify(newInfo));

                                        setSelectedAnswer(-1);

                                        setShowCorrect(true);
                                        setTimeout(() => {
                                            setShowCorrect(false);

                                            if (test.questions[(question + 1)] === undefined) {
                                                history.push('/finishTest/' + test.id.toString());
                                            } else {
                                                history.push('/test/' + test.id.toString() + '/' + (question + 2).toString());
                                            }
                                        }, 1250);
                                    }}
                                >
                                    {test.questions.length === (question+1) ? "Завершить тест" : "Ответить"}
                                </Button>
                            </div>}
                    </Container>
            }
        </main>,
        <Footer key={2}/>
    ]);
}

export default Tests;