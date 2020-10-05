//import dependencies
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher"; //pusgher to make it real-time
import cors from "cors";
import mongoMessages from "./messageModel.js";

//appconfig
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  //put your pusher configs here
});

//middlewares
app.use(express.json()); // for json stuffs
app.use(cors()); // to add cors headers

//db config
const mongoURI =
  "mongodb+srv://admin:password@cluster0.lpiww.mongodb.net/messengerDB?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB CONNECTED"); //if open fire off function db connected

  const changeStream = mongoose.connection.collection("messages").watch(); //whenver something changes in the colections, this will know about it
  changeStream.on("change", (change) => {
    pusher.trigger("messages", "newMessage", {
      change: change,
    });
  });
});

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/save/message", (req, res) => {
  const dbMessage = req.body;

  mongoMessages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/retrieve/conversation", (req, res) => {
  mongoMessages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(201).send(data);
    }
  });
});

//listener
app.listen(port, () => console.log(`listening on localhost:${port}`)); //gives feedback if app is ur app is running correctly
