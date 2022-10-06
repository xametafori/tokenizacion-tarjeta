const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cardSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    card_number: {
        type: String,
        required: true
    },
    ccv: {
        type: String,
        required: true
    },
    expiration_year: {
        type: String,
        required: true
    },
    expiration_month: {
        type: String,
        required: true
    },
    expiration_token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cards',cardSchema);