class Founds {
    name;
    amount;
    bills=[];

    constructor(obj){
        this.#parse(obj);
    }

    #parse(obj){
        let self = this.self;
        for (const [k,v] of Object.entries(obj)) {
            self[k]=v;
        }
    }

    get self(){
        return this;
    }
}

module.exports = {
    Founds
}
