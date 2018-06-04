'use strict'
const { Pool } = require ('pg');

class DbService {

    constructor() {
        this._pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });
    }

    performQuery( query, valuesArr) {
        return new Promise((resolve, reject) => {
            try {
                this._pool.connect().then((client) => {
                    var result = client.query(query, valuesArr);
                    client.release();
                    resolve(result);
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });

    }
}

module.exports = DbService;