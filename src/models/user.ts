import { ObjectId } from "mongodb";
import db from "../services/mongo";

class User {
  constructor(
    public email: string,
    public password: string,
    public likes: { [key: string]: string },
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

  update() {
    return db
      .getDb()
      .collection("users")
      .updateOne({ _id: this._id }, { $set: this });
  }
}

export default User;
