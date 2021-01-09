import React, {useEffect, useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import {Form, Container, Button, Alert} from "react-bootstrap";
import API from "../Tests/API";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import "../Styles/Tests.css";

const Tests = () => {
    const [test, setTest] = useState({});
    const [question, setQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(-1)

    let params = useParams();
    let history = useHistory();


    useEffect(() => {
        document.title = "Безопасность | Проверка знаний"

        let user = localStorage.getItem("user");
        if(user == null) {
            history.push('/');
            return;
        }

        const testResponse = API.getTest(parseInt(params.testId));
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
                if(testStorageInfo.questionsCompleted.indexOf(question.toString()) !== -1) {
                    if(testResponse.questions[(question+1)] === undefined) {
                        history.push('/finishTest/'+testResponse.id.toString());
                    } else {
                        history.push('/test/'+testResponse.id.toString()+'/'+(question+2).toString());
                    }
                }
            }
        } else {
            // specially, so that the inscription does not flash that such a test does not exist
            setTest(null);
        }
    }, [params, history, question]);

    return([
        <Header key={0}/>,
        <main key={1}>
            {test === null ?
                <Container className="text-center">
                    <h2 className="mb-4">Тест не найден!</h2>
                    <Button
                        onClick={() => {
                            history.push('/');
                        }}
                    >
                        Вернуться на главную
                    </Button>
                </Container>
            :
                window.location.hash === "#greeting" && ( typeof(test.greeting) != "undefined" && test.greeting !== null ) ?
                    <Container className="text-center">
                        <h2 className="mb-4" dangerouslySetInnerHTML={{__html: test.greeting}}></h2>
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
                        {test.questions &&
                            <div className="text-center">
                                <h2 className="mb-4">{test.questions[question].title}</h2>
                                {selectedAnswer === -2 &&
                                <Alert variant="danger" style={{ width: "60%", marginLeft: "20%" }}>
                                    Необходимо выбрать<br/>правильный ответ!
                                </Alert>
                                }
                                {test.questions.map((item, key) => {
                                    if(key === question) {
                                        return(
                                            <Form key={question}>
                                                <Form.Group>
                                                    {item.answers.map((item, key) => {
                                                        return(
                                                            <Form.Check
                                                                name={"test-"+question.toString()}
                                                                key={key}
                                                                type="radio"
                                                                label={item}
                                                                onClick={() => setSelectedAnswer(key)}
                                                            />)
                                                    })}
                                                </Form.Group>
                                            </Form>
                                        )
                                    }

                                    return null;
                                })}
                                <Button
                                    onClick={() => {
                                        if (selectedAnswer === -1) {
                                            setSelectedAnswer(-2);
                                            return;
                                        }

                                        let testStorageInfo = localStorage.getItem("test-" + test.id.toString());
                                        if (testStorageInfo === null || typeof (testStorageInfo) == "undefined") {
                                            testStorageInfo = JSON.stringify({
                                                rights: 0,
                                                wrongs: 0,
                                                questionsCompleted: []
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

                                        if (test.questions[(question + 1)] === undefined) {
                                            history.push('/finishTest/' + test.id.toString());
                                        } else {
                                            history.push('/test/' + test.id.toString() + '/' + (question + 2).toString());
                                        }

                                        setSelectedAnswer(-1);
                                    }}
                                >
                                    Проверить
                                </Button>
                            </div>}
                    </Container>
            }
        </main>,
        <Footer key={2}/>
    ]);
}

export default Tests;