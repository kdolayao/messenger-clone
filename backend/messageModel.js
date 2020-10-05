//schema for the database
import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  username: String,
  message: String,
  timestamp: String,
});
//collection name in the model - make it prural!!
export default mongoose.model("messages", messageSchema);
