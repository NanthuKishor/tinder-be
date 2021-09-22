import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import cors from "cors";

//App config
const app = express();
const port = process.env.PORT || 3001;
const connection_url = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.7syhh.mongodb.net/tinderDB?retryWrites=true&w=majority`;

// Middlewares
// to recieve data in post request as a json file.
app.use(cors());
// for secure cross-origin requests and data transfers between browsers and servers.
app.use(express.json());

//DB config
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//API endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello server is working.."); //this will be displayed inside once the backend is hosted.
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  //   console.log(dbCard);

  //since we dont have a post request from the user side, and we only need this post request to add data to the data-base using a postman app

  // so, Model.create(data) is the same as new Model({}).
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listner
app.listen(port, () => {
  console.log(`Listening on localhost: ${port} `);
});

//mongodb password :
