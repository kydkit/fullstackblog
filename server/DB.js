const path = require("path");
const sqlite3 = require("sqlite3");

// The name of the db in this line of code must match the name you gave your database when you created it.
const dbPath = path.join(__dirname, "./blogdb.db");

// wrapper for async/await
module.exports = class DB {
  constructor() {
    this.db = new sqlite3.Database(dbPath);
  }

  runner(method, query, params) {
    return new Promise((res) => {
      this.db[method](query, params, (err, result) => {
        if (err) {
          throw new Error(err);
        }
        res(result);
      });
    });
  }

  async get(...args) {
    return await this.runner("get", ...args);
  }

  async run(query, params) {
    return new Promise((res) => {
      this.db.run(query, params, function (err) {
        if (err) {
          throw new Error(err);
        }
        res(this);
      });
    });
  }

  async all(...args) {
    return await this.runner("all", ...args);
  }

  async each(...args) {
    return await this.runner("each", ...args);
  }
};
