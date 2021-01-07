class API {
    static URL = "https://ssapi.ru/";

    static async sendRequest(method, params = {}) {
        console.log(`📍 Fetch POST request to method: ${method.toString()}`);

        let response = null;
        let json = null;

        try {
            const url = API.URL + method.toString();
            const paramsStr = new URLSearchParams(params).toString();

            response = await fetch(`${url}?${paramsStr}`);
        } catch (e) {
            console.log(`😱 Fetch request failed:\n                  ${e}`);
            return null;
        }

        if(!response.ok) {
            console.log(`😱 Fetch request failed:\n                  ${response.error()}`);
            return null;
        }

        try {
            json = await response.json();
        } catch (e) {
            console.log(`😱 Fetch request failed:\n                  ${e}`);
            return null;
        }

        console.log(`👉 Fetch returned successfully!`);
        return json;
    }
}

export default API;