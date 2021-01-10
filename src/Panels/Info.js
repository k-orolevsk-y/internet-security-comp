import React, {useEffect} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const Info = () => {

    useEffect(() => {
        document.title = "Безопасность | Изучение информации"
    }, []);

    return([
        <Header key={0}/>,
        <main key={1}>

        </main>,
        <Footer key={2}/>
    ]);
}

export default Info;