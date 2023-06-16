const fs = require('fs');
const readline = require('readline');
const { MongoClient } = require('mongodb');
const express = require("express");
const app = express();
app.use(express.static("public"))
app.use(express.json())

app.get("/", (req,res) => {
  res.redirect("/index.html")
})

const filePath = 'D:/Programming/EngWords/words_alpha.txt';
const uri = 'mongodb://localhost:27017';
const dbName = 'EnglishWords';
const collectionName = 'engWords';

const client = new MongoClient(uri);
const db = client.db(dbName);
const collection = db.collection(collectionName);

(async function () {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    
    for await (const line of rl) {
      const word = line.trim();
      await collection.insertOne({ word });
    }
    
    console.log('Data loaded successfully.');
  } catch (err) {
    console.error('Ошибка:', err);
  } finally {
    client.close();
  }
})();

app.get('/search/:word', async (req, res) => {
  const client = new MongoClient(uri);
  const word = req.params.word;
  try {
    await client.connect();
    const result = await collection.findOne({ word });
    if (result) {
      res.json({ found: true });
    } else {
      res.json({ found: false });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.close();
  }
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});

