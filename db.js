const mongoose = require('mongoose');

const usuario = "card"
const password = "0zEX4AvGo09R1mNu"
const dbName = "tokencards"

const uri = `mongodb+srv://${usuario}:${password}@cluster0.ncdk5.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))