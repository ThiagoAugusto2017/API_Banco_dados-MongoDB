const express = require('express');
const mongoose = require('mongoose');

require("./models/Artigo");
const Artigo = mongoose.model('artigo'); // conexao com o banco

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/Artigo', { //! trocamos aqui para uri
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
});


//* Buscar todos
app.get("/busca", (req, res) => {

    Artigo.find({}).then((artigo) => { // consição de pesquisa

        return res.json(artigo); // retorno dos dados

    }).catch((erro) => {
        return res.status(400).json({


            message: "Nenhum artigo encontrado!"
        })
    })
});


//*Busca com filtro
app.get(encodeURI("/artigo/:id%26:id2"), (req, res) => {

    Artigo.findOne({ //me retorna o primeiro que achar

        NOME: req.params.id,
        EMPRESA: req.params.id2
    }, {
        // NASC: 1, //posso filtra oque vou receber da chamada api
        // EMPRESA: 0,
        // _id: 0

        //! melhorar filtro

    }).then((json_retorno) => { // consição de pesquisa
        res.json(json_retorno); // retorno dos dados

    }).catch((erro) => {
        return res.status(400).json({
            message: "Nenhum artigo encontrado!"
        })
    })
});


//* Adicionar dados ao banco
app.post("/add", (req, res) => { // adicionar dados dentro do banco de dados

    const artigo = Artigo.create(req.body, (err) => {

        if (err) return res.status(400).json({

            message: "Error: Artigo não foi cadastrado com sucesso!"
        });

        return res.status(200).json({

            message: "Artigo cadastrado com sucesso!"
        })
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});