const IDb = require("./IDB");

class ContextStrategy extends IDb {
  constructor(db) {
    super();
    this._db = db;
  }
  static connect() {
    return this._db.connect();
  }
  isConnected() {
    return this._db.isConnected();
  }
  create(item) {
    return this._db.create(item);
  }
  read(item, skip, limit) {
    return this._db.read(item, skip, limit);
  }
  update(id, item) {
    return this._db.update(id, item);
  }
  delete(id) {
    return this._db.delete(id);
  }
}

module.exports = ContextStrategy;
