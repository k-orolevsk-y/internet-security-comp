class InfoAPI {
    static info = {
        1: {
            title: ""
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