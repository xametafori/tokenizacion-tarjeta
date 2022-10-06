
var jwt = require('jsonwebtoken') 
const Cards = require('../models/cardModel')

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

        resolve(carsave)
    })
}



module.exports = {
    findById,
    create
}
