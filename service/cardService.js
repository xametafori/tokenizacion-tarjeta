
var jwt = require('jsonwebtoken') 
const Cards = require('../models/cardModel')
const { valid_credit_card } = require('../utils')

function findById(id) {
    
    return new Promise((resolve, reject) => {

        const card = Cards.findById(id);
        
        resolve(card)
    })
}

function create(card) {
   

    return new Promise((resolve, reject) => {

        var SECRET = "SECRETO_PARA_ENCRIPTACION";
        var token = jwt.sign(card, SECRET, { expiresIn: 900 }) ;
        var decoded = jwt.decode(token);
        card.expiration_token = decoded.exp;
        const carsave = Cards(card);

        carsave.save();
       // if (process.env.NODE_ENV !== 'test') {
         //   writeDataToFile('./data/cards.json', cadCollection);
        //}
        resolve(carsave)
    })
}



module.exports = {
    findById,
    create
}
