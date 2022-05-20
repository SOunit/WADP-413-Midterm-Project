import { Db, MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r27pb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

let _db: Db;

type InitDBCallBack = (err: Error | null, _db?: Db) => void;

const initDb = (callback: InitDBCallBack) => {
  if (_db) {
    console.log("database is already initialized!");
    return callback(null, _db);
  }

  client
    .connect()
    .then((client) => {
      _db = client.db();
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database not initialized");
  }
  return _db;
};

export default { initDb, getDb };
