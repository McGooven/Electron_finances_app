const Datastore = require('nedb');
import Periods from './Periods';
import Founds from './Founds';
import Bills from './Bills';

export default class DB{
    #dataStoreName;
    #datastore;

    connect(param, collection){
        let options ={
            filename: __dirname + collection + '.dat',
            autoload: true
        }

        for(var k in options) options[k]=param[k];
        this.datastore = new Datastore(dbOP);
        this.datastoreName = collection;

        return this.datastore;
    };

    currentDatastore(){
        return this.datastoreName;
    }

    insert(document){
        let result;
        this.datastore.insert(document,(err, newDoc)=>{
            if(err) {
                result = err;
                console.error('ERROR: ',err);
            }else{
                result = newDoc;
            }
        })

        return this.parse([result])[0];
    }

    find(query, sort, limit){
        let result = this.datastore.find(query);
        let r;

        if(sort !== undefined) 
            result = result.sort(sort)
        if(limit !== undefined) 
            result = result.limit(limit);

        result.exec((err, docs)=>{
            if(err){ 
                r = err;
                console.error('ERROR: ',err);
            }else{
                r=docs;
            }
        })
        return this.parse(r);
    }

    #parse(docs){
        let result;
        switch (dataStoreName.toLowerCase()) {
            case 'periods':
                result = docs.map((obj)=>{
                    return new Periods(obj);
                })
                break;
            case 'bills':
                result = docs.map((obj)=>{
                    return new Bills(obj);
                })
                break;
            case 'founds':
                result = docs.map((obj)=>{
                    return new Founds(obj);
                })
                break;
            default:
                break;
        }

        return result;
    }
}