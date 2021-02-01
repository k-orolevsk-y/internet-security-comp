import React, {useEffect, useState} from "react";
import {Col, Container, Row, Breadcrumb, Button} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import InfoAPI from "../API/InfoAPI";


const Info = () => {
    const [info, setInfo] = useState(<></>);

    let history = useHistory();
    let params = useParams();

    useEffect(() => {

        const infoResponse = InfoAPI.getInfo(parseInt(params.infoId.toString()));
        if(infoResponse != null) {
            setInfo(infoResponse);
        } else {
            setInfo(null);
        }

        document.title = `Безопасность | ${infoResponse?.name ?? "Статьи"}`
    }, [params]);

    return([
        <Header key={0}/>,
        info?.breadcrumb &&
        <Breadcrumb key={3} style={{ marginBottom: "-7.5rem" }}>
            {info.breadcrumb.map((item, key) => {
                return <Breadcrumb.Item
                    key={key}
                    active={item[1] === undefined}
                    style={{
                        color: "black",
                        cursor: "default"
                    }}
                    onClick={() => {
                        if(item[1] === undefined) return null;

                        history.push(item[1]);
                    }}
                >
                    {item[0]}
                </Breadcrumb.Item>
            })}
        </Breadcrumb>,
        <main key={1}>
            {!info ?
                <Container className="text-center">
                    <Row>
                        <Col>
                            <h2 className="mb-4">Статья не найдена!</h2>
                            <Button
                                onClick={() => {
                                    history.push("/");
                                }}
                            >
                                Вернуться на главную
                            </Button>
                        </Col>
                    </Row>
                </Container>
                : (window.innerWidth >= 961 || info.htmlMobile == null ? info.html : info.htmlMobile)
            }
        </main>,
        <Footer key={2}/>
    ]);
}

export default Info;