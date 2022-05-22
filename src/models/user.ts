import { ObjectId } from "mongodb";
import db from "../services/mongo";

class User {
  constructor(
    public email: string,
    public password: string,
    public _id?: ObjectId
  ) {}

  save() {
    db.getDb().collection("users").createIndex({ email: 1 }, { unique: true });
    return db.getDb().collection("users").insertOne(this);
  }

  static getUserById(_id: string) {
    return db
      .getDb()
      .collection("users")
      .findOne({ _id: new ObjectId(_id) });
  }

  static getUserByEmailAndPassword(email: string, password: string) {
    return db.getDb().collection("users").findOne({ email, password });
  }
}

export default User;
