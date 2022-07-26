export default class Founds {
    name;
    amount;
    #bills=[];

    constructor(obj){
        this.parse(obj);
    }

    #parse(obj){
        let self = this.self();
        for(var k in obj) self[k]=obj[k];
    }

    get self(){
        return this;
    }
}
