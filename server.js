const http = require('http');
const {
  getCard,
  createCard
} = require('./controllers/cardController');

const server = http.createServer((req, res) => {
var headJsonStrFy = JSON.stringify(req.headers);
var headParse = JSON.parse(headJsonStrFy);

  if (req.url.match(/\/api\/card\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getCard(req, res, id);
  } else if (req.url === '/api/token' && req.method === 'POST' && headParse.apikey === 'pk_123456789') {
    createCard(req, res,headParse.apikey);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the api/cards endpoint',
      })
    );
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');

const usuario = "card"
const password = "0zEX4AvGo09R1mNu"
const dbName = "tokencards"

const uri = `mongodb+srv://card:OxAnV1z09EL6oc6M@Cluster0.fjqcyhk.mongodb.net/tokencards?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

module.exports = server;


