const Datastore = require('nedb');
const fs = require('fs');
const { Periods } = require('./Periods');
const { Founds } = require('./Founds');
const { Bills } = require('./Bills');

class DB {
    #currentColl;
    #datastoreName;
    #db={};

    constructor() {
        this.#connect();
    }

    #connect() {
        let rawdata = fs.readFileSync('dbconfig.json');
        let db = JSON.parse(rawdata);

        db.forEach(collection => {
            let options = {
                filename: collection.path,
                autoload: true
            }
            this.#db[collection.collection] = new Datastore(options);
            this.#db["default"] = collection.default == true ? collection.collection : db[0].collection;
        });
    };

    getConnection(param){
        let def = this.#db['default'];
        let givenCollection =this.#db[param];
        try {
            if(givenCollection === undefined){
                throw `the provided collection doesn't exist`;
            }
            this.#datastoreName = param;
        } catch (error) {
            console.error(error);
            this.#datastoreName = def;
            givenCollection = this.#db[def];
        }
        this.#currentColl= givenCollection;
        return this;
    }

    insert(document){
        return new Promise((resolve, reject)=>{
            this.#currentColl.insert(document,(err, newDoc) => {
                err ? reject(err) : resolve(this.#parse(newDoc));
            });
        });
    }

    find(query, sort, skip, limit){
        return new Promise((resolve, reject)=>{
            let conn = this.#currentColl.find(query);
            if (sort)
                conn = conn.sort(sort);
            if(skip)
                conn = conn.skip(skip);
            if (limit)
                conn = conn.limit(limit);

            conn.exec((err, docs)=>{
                err ? reject(err) : resolve(this.#parse(docs));
            })
        });
    }

    #parse(docs){
        let result;
        if(Array.isArray(docs)){
            switch (this.#datastoreName.toLowerCase()) {
                case 'periods':
                    result = docs.map((obj) => {
                        return new Periods(obj);
                    })
                    break;
                case 'bills':
                    result = docs.map((obj) => {
                        return new Bills(obj);
                    })
                    break;
                case 'founds':
                    result = docs.map((obj) => {
                        return new Founds(obj);
                    })
                    break;
                default:
                    break;
            }
        }else{
            switch (this.#datastoreName.toLowerCase()) {
                case 'periods':
                    result = new Periods(docs);
                    break;
                case 'bills':
                    result = new Bills(docs);
                    break;
                case 'founds':
                    result = new Founds(docs);
                    break;
                default:
                    break;
            }
        }

        return result;
    }
}

let dbc = new DB();
module.exports = {
    db : dbc
}