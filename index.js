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

app.get('/', (req, res) => {
  res.json({message: 'API working'})
})

app.get('/search-canteens/:search', async (req, res) => {
  const search = req.params.search;
  const docs = (await canteens.get()).docs

  const searchResults = closestMatch(docs, search);

  res.json({
    searchResults
  })
})

app.get('/get-canteen/:id', async (req, res) => {
  const id = req.params.id;
  const doc = await canteens.doc(id).get()
  console.log(id)
  console.log(doc.data())

  if (!doc.exists) {
    res.json({ doc: null, error: 'Doc not found' })
  }
  else {
    res.json({ doc: doc.data() })
  }
})

app.listen(5000);
module.exports = app;