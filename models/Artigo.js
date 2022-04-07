const mongoose = require('mongoose');

const Artigo = new mongoose.Schema({
    EMPRESA: {
        type: String,
        required: true
    },
    NOME: {
        type: String,
        required: true
    },
    NASC: {
        type: String,
        required: true
    },
    SALA: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

mongoose.model('artigo', Artigo);