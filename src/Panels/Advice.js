import React, {useEffect} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const Advice = () => {

    useEffect(() => {
        document.title = "Безопасность | Советы"
    }, []);

    return([
        <Header key={0}/>,
        <main key={1}>
            test
        </main>,
        <Footer key={2}/>
    ]);
}

export default Advice;