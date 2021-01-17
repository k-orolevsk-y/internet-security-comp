import React, {useEffect, useState} from "react";
import {Col, Container, Row, Breadcrumb} from "react-bootstrap";
import { useParams } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import InfoAPI from "../API/InfoAPI";


const Info = () => {
    const [info, setInfo] = useState(<></>);

    let params = useParams();

    useEffect(() => {
        document.title = "Безопасность | Изучение информации"

        const infoResponse = InfoAPI.getInfo(parseInt(params.infoId.toString()));
        if(infoResponse != null) {
            setInfo(infoResponse);
        } else {
            setInfo(null);
        }
    }, [params]);

    return([
        <Header key={0}/>,

        info.breadcrumb &&
        <Breadcrumb key={3}>
            {info.breadcrumb.map((item, key) => {
                return <Breadcrumb.Item key={key} active={true} href={item[1] ?? ""} style={{ color: "black" }}>{item[0]}</Breadcrumb.Item>
            })}
        </Breadcrumb>,

        <main key={1}>
            {info === null ?
                <Container className="text-center">
                    <Row>
                        <Col>
                            <h2 className="mb-4">Статья не найдена!</h2>
                        </Col>
                    </Row>
                </Container>
                : info.html
            }
        </main>,
        <Footer key={2}/>
    ]);
}

export default Info;