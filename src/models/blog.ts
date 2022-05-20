import { ObjectId } from "mongodb";
import db from "../services/mongo";

class Blog {
  constructor(public title: string, public _id?: ObjectId) {}

  save() {
    console.log("save this", this);

    const dbo = db.getDb();
    return dbo.collection("blogs").insertOne(this);
  }

  static getBlogList() {
    const dbo = db.getDb();
    return dbo.collection("blogs").find().toArray();
  }

  static getBlogById(_id: string) {
    const dbo = db.getDb();
    return dbo.collection("blogs").findOne({ _id: new ObjectId(_id) });
  }

  updateBlog(this: Blog) {
    console.log(this);

    const dbo = db.getDb();
    return dbo
      .collection("blogs")
      .updateOne({ _id: new ObjectId(this._id) }, { $set: this });
  }
}

export default Blog;
