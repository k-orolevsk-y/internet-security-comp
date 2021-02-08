import React, {useEffect, useState} from "react";
import {Col, Container, Row, Breadcrumb, Button} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import ScrollToTop from "react-scroll-up";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import InfoAPI from "../API/InfoAPI";
import {Icon28ArrowUpCircleOutline} from "@vkontakte/icons";


const Info = () => {
    const [info, setInfo] = useState(<></>);
    const [duration, setDuration] = useState(2500);

    let history = useHistory();
    let params = useParams();

    useEffect(() => {
        let user = localStorage.getItem("user");
        if(user == null) {
            history.push('/');
            return;
        }

        const infoResponse = InfoAPI.getInfo(parseInt(params.infoId.toString()));
        if(infoResponse != null) {
            if(infoResponse.whom !== user && infoResponse.whom !== "all") {
                setInfo(null);
            } else {
                setInfo(infoResponse);
            }
        } else {
            setInfo(null);
        }

        document.title = `Безопасность | ${infoResponse?.name ?? "Статьи"}`
        setTimeout(() => {
            setDuration(parseInt(document.body.scrollHeight / 3));
        }, 500)
    }, [params, history, duration]);

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
            <ScrollToTop
                showUnder={250}
                style={{ bottom: "80px", background: "white", borderRadius: "40px" }}
                duration={duration}
            >
                {window.innerWidth >= 961 ? <Icon28ArrowUpCircleOutline width={48} height={48}/> : <Icon28ArrowUpCircleOutline/> }
            </ScrollToTop>
        </main>,
        <Footer key={2}/>
    ]);
}

export default Info;