const mongoose = require('mongoose');

const Client = mongoose.model('Client',{

    name: String,
    contato: String,
    total: Number,
    contas: Array
})

module.exports = Client