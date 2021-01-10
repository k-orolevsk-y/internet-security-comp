class API {
    static tests = {
        1: {
            id: 1,
            whom: "baby",
            greeting: "Друг, теперь нам необходимо узнать, насколько ты уже знаешь о безопасности в интернете.<br/>Давай пройдем небольшой тест 😉",
            questions: [
                {
                    title: "Как меня зовут?",
                    answers: [ "Антон", "Егор", "Влад", "Кирилл" ],
                    rightAnswer: 3
                },
                {
                    title: "Кто я?",
                    answers: [ "Мальчик", "Девочка" ],
                    rightAnswer: 0
                },
                {
                    title: "Сколько мне лет?",
                    answers: [ "17", "19", "18", "16" ],
                    rightAnswer: 0
                },
            ],
            infoFinish: [
                "тест пройден на 0-25 процентов<br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam animi blanditiis cupiditate deserunt dicta dolorem doloribus ea eius eveniet excepturi expedita explicabo facere fugit illo incidunt inventore ipsam iusto labore molestias mollitia" ,
                "тест пройден на 26-50 процентов<br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam animi blanditiis cupiditate deserunt dicta dolorem doloribus ea eius eveniet excepturi expedita explicabo facere fugit illo incidunt inventore ipsam iusto labore molestias mollitia",
                "тест пройден на 51-75 процентов<br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam animi blanditiis cupiditate deserunt dicta dolorem doloribus ea eius eveniet excepturi expedita explicabo facere fugit illo incidunt inventore ipsam iusto labore molestias mollitia",
                "тест пройден на 76-100 процентов<br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam animi blanditiis cupiditate deserunt dicta dolorem doloribus ea eius eveniet excepturi expedita explicabo facere fugit illo incidunt inventore ipsam iusto labore molestias mollitia"
            ]
        },
        2: {
            id: 2,
            whom: "parent",
            greeting: "Здравствуйте. Для того чтобы Вы могли объяснить безопасность про интернет себе и своим детям, необходимо пройти небольшой тест.<br/>Который покажет, насколько Вы знаете правила безопасности.",
            questions: [
                {
                    title: "Как меня зовут?",
                    answers: [ "Антон", "Егор", "Влад", "Кирилл" ],
                    rightAnswer: 3
                }
            ],
        }
    };

    static getTest = (id) => {
        if(this.tests[id] === undefined) {
            console.log(`😱 TestsAPI failed get test by id ${id}!`);
            return null;
        }

        return this.tests[id];
    }
}

export default API;