require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const IDb = require("../base/IDB");
const mongoose = require("mongoose");

const STATUS = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Disconectando"
};

class MongoStrategy extends IDb {
  constructor(conn, schema) {
    super();
    this._conn = conn;
    this._sch = schema;
  }
  async isConnected() {
    const state = STATUS[this._conn.readyState];

    if (state === "Conectado") return state;
    if (state !== "Conectando") return state;

    await new Promise(resolve => setTimeout(resolve, 1000));
    return STATUS[this._conn.readyState];
  }
  static connect() {
    mongoose.connect(
      process.env.MONGO_URL,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      error => {
        if (!error) return;
        console.log("Falha Na Conexão!", error);
      }
    );
    const conn = mongoose.connection;
    conn.once("open", () => console.log("Db Running"));
    return conn;
  }
  create(item) {
    return this._sch.create(item);
  }
  read(item = {}) {
    return this._sch.find(item, { name: 1, email: 1, password: 1 });
  }
  update(id, item) {
    return this._sch.updateOne({ _id: id }, { $set: item });
  }
  delete(id) {
    return this._sch.deleteOne({ _id: id });
  }
}

module.exports = MongoStrategy;
