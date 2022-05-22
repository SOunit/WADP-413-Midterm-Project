import { ObjectId } from "mongodb";
import db from "../services/mongo";

class Blog {
  constructor(
    public title: string,
    public comments: string[],
    public _id?: ObjectId
  ) {}

  save() {
    return db.getDb().collection("blogs").insertOne(this);
  }

  static getBlogList() {
    return db.getDb().collection("blogs").find().toArray();
  }

  static getBlogById(_id: string) {
    return db
      .getDb()
      .collection("blogs")
      .findOne({ _id: new ObjectId(_id) });
  }

  updateBlog() {
    return db
      .getDb()
      .collection("blogs")
      .updateOne({ _id: new ObjectId(this._id) }, { $set: this });
  }

  static deleteBlogById(_id: string) {
    return db
      .getDb()
      .collection("blogs")
      .deleteOne({ _id: new ObjectId(_id) });
  }
}

export default Blog;
