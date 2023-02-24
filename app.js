const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, getDocs} = require('firebase-admin/firestore');
const config = require('./credentials.json')
const { closestMatch } = require('./logic');

initializeApp({
  credential: cert(config)
});
const app = express()
app.use(bodyParser.json());
const db = getFirestore();
const canteens = db.collection('canteens');
app.use(cors());

app.get('/', () => {
  res.json({message: 'API working'})
})

app.get('/search-canteens/:search', async (req, res) => {
  const search = req.params.search;
  const docs = (await canteens.get()).docs.map(doc => doc.data())

  const searchResults = closestMatch(docs, search);

  res.json({
    searchResults
  })
})

app.listen(5000);
module.exports = app;