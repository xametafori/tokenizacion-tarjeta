
const Card = require('../service/cardService')
const { getPostData,valid_credit_card,valid_credit_card_cvv,valid_month,valid_year,valid_email } = require('../utils')
const moment = require('moment');
const cardModel = require('../models/cardModel');



// @desc    Gets Single Card
// @route   GET /api/Card/:id
async function getCard(req, res, id) {
    try {
        const card = await Card.findById(id)

        if (parseInt(card.expiration_token) <= moment().unix()) {
            res.writeHead(401, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ message: 'Tu conexión ha expirado. Vuelve a generar el token.' }))
        }
        if(!card) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ message: 'Card Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            const jsonResponse= JSON.stringify(card)

            var obj = JSON.parse(jsonResponse)
    
            var email = obj.email;
            var card_number = obj.card_number; 
            var expiration_year = obj.expiration_year;
            var expiration_month = obj.expiration_month;
            const cardResponse = {
                email, 
                card_number, 
                expiration_year,
                expiration_month
            }

            return res.end(JSON.stringify(cardResponse))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Card
// @route   POST /api/cards
async function createCard(req, res, headerKey) {
    try {

       
        if (headerKey != 'pk_123456789') {
            res.writeHead(401, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ message: 'El Key enviado en el header es incorrecto' }))
        }
        const body = await getPostData(req)

        const { email, card_number, ccv,expiration_year,expiration_month } = JSON.parse(body)

        const card = {
            email, 
            card_number, 
            ccv,
            expiration_year,
            expiration_month
        }

        const valCard = valid_credit_card(card.card_number);
        const valcvv = valid_credit_card_cvv(card.ccv);
        const valmonth = valid_month(card.expiration_month);
        const valyear = valid_year(card.expiration_year);
        const valemail = valid_email(card.email);
        res.writeHead(401, { 'Content-Type': 'application/json' })

        

        if (!valCard) {
            return res.end(JSON.stringify({ message: 'La tarjeta enviada no cumple con los criterios de LUHN' }))
        }
        if (!valcvv) {
            return res.end(JSON.stringify({ message: 'el cvv no cumple con los criterios' }))
        }
        if (!valmonth) {
            return res.end(JSON.stringify({ message: 'el month no cumple con los criterios' }))
        }
        if (!valyear) {
            return res.end(JSON.stringify({ message: 'el year no cumple con los criterios' }))
        }
        if (!valemail) {
            return res.end(JSON.stringify({ message: 'el email no cumple con los criterios' }))
        }
        const newCard = await Card.create(card)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newCard))  

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCard,
    createCard
}