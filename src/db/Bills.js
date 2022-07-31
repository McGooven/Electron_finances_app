class Bills{
    date;
    amount;
    found;
    isInit=false;
    done=true;
    period;

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

module.exports={Bills};