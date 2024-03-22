const express = require("express");
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT;
const url = process.env.DB_URL;

const countTopics = [{ $group: { _id: "$topic", count: { $sum: 1 } } },];

app.get("/topics", async (req, res) => {
  const client = await MongoClient.connect(url);
  const collection = client.db().collection("emotions");
  const cursor = collection.aggregate(countTopics);
  const data = await cursor.sort({ _id: 1 }).toArray();
  client.close();
  res.json(data);
});

app.get("/emotions/topic/:id", async (req, res) => {
  const id = req.params.id.slice(1);
  const countEmotions = [
    {
      $match: {
        topic: id,
      },
    },
    {
      $group: {
        _id: "$emotions",
        count: {
          $sum: 1,
        },
      },
    },
  ];
  const client = await MongoClient.connect(url);
  const collection = client.db().collection("emotions");
  const cursor = collection.aggregate(countEmotions);
  const data = await cursor.toArray();
  client.close();
  res.json(data);
});

app.get("/sentiment/topic/:id", async (req, res) => {
  const id = req.params.id.slice(1);
  const countEmotions = [
    {
      $match: {
        topic: id,
      },
    },
    {
      $group: {
        _id: "$sentiment",
        count: {
          $sum: 1,
        },
      },
    },
  ];
  const client = await MongoClient.connect(url);
  const collection = client.db().collection("emotions");
  const cursor = collection.aggregate(countEmotions);
  const data = await cursor.sort({ _id: 1 }).toArray();
  client.close();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
