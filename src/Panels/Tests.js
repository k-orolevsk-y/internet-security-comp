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
        if(testResponse.whom === user) {
            setTest(testResponse);
        } else {
            setTest(null);
        }

        if(params.question !== undefined) {
            let num = (parseInt(params.question)) - 1;
            if(num < 0 || isNaN(num) || testResponse.questions[num] === undefined) num = 0;

            setQuestion(num);
        }
    }, [params, history]);

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
                params.greeting !== undefined ?
                    <Container className="text-center">
                        <h2 className="mb-4">{test.greeting}</h2>
                        <Button
                            onClick={() =>
                                history.push('/test/'+params.testId.toString()+'/1')
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
                                {selectedAnswer == -2 &&
                                <Alert variant="danger" style={{ width: "60%", marginLeft: "20%" }}>
                                    Необходимо выбрать<br/>правильный ответ!
                                </Alert>
                                }
                                <Form.Group>
                                    {test.questions[question].answers.map((item, key) => {
                                        return(
                                            <Form.Check
                                                name="question"
                                                type="radio"
                                                label={item}
                                                onClick={() => setSelectedAnswer(key)}
                                            />)
                                    })}
                                </Form.Group>
                                <Button
                                    onClick={() => {
                                        if(selectedAnswer === -1) {
                                            setSelectedAnswer(-2);
                                            return;
                                        }
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