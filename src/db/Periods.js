class Periods {
    #initDate;
    #finishDate;
    #period;
    #descrip;
    #moneySources;
    #bills=[];

    constructor(obj){
        this.parse(obj);
    }

    #parse(obj){
        let self = this.self();
        for(var k in obj) self[k]=obj[k];
    }

    get self(){
        return {
            initDate:this.initDate,
            finishDate:this.finishDate,
            period:this.period,
            descrip:this.descrip,
            moneySources:this.moneySources,
            bills:this.bills
        }
    }
}

module.exports={Periods}