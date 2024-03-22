const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const url = process.env.DB_URL;

app.get('/', async (req, res) => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const collection = client.db().collection('dataset1');
  const data = await collection.find({}).toArray();
  client.close();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});