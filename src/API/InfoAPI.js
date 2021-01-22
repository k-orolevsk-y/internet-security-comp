import React from "react";
import {Container} from "react-bootstrap";

class InfoAPI {
    static info = {
        1: {
            name: "Введение в интернетную безопасность",
            html:
                <>
                    <h1 className="text-center">Введение в интернетную безопасность</h1>
                    <Container>

                    </Container>
                </>,
            breadcrumb: [
                [ "Категории", "/choiceInfo" ],
                [ "Введение в безопасность" ]
            ]
        }
    }

    static getInfo(id) {
        if(this.info[id] === undefined) {
            console.log(`😱 InfoAPI failed get info by id ${id}!`);
            return null;
        }

        return this.info[id];
    }
}

export default InfoAPI;