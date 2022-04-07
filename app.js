//*aplicações
const express = require('express');
const mongoose = require('mongoose');
require("./models/Artigo");
require('dotenv').config()
const Artigo = mongoose.model('artigo'); // conexao com o banco
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

//* Autorização
const senha_cors = process.env.senha_cors
app.use(async (req, res, next) => {
    res.header("access-control-allow-origin", "*") // somente servidor que adicionarmos
    res.header("access-control-allow-methods", 'GET, PUT, POST, DELETE, OPTIONS')
    res.header("Access-Control-Expose-Headers", `${senha_cors}`)
    app.use(cors());
    next();
})

//*Conexão com o banco
const user_banco = process.env.user_banco
const Senha_Banco = process.env.Senha_Banco
const Banco_dados = process.env.Banco_dados
mongoose.connect(`mongodb+srv://${user_banco}:${Senha_Banco}@apiartigo.cx6si.mongodb.net/${Banco_dados}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
    app.listen(8080, () => {
        console.log("Servidor iniciado na porta 8080: http://localhost:8080/")
    });
}).catch((erro) => {
    console.log(erro);
});


//Todos = Rotas+++++++


//*Busca com filtro
app.get(("/filtro/"), async (req, res) => {

    let operador = req.query['constraints'] //JSON.parse(req.query['constraints'])

    let operador_ternario = operador !== undefined ? operador = JSON.parse(req.query['constraints']) : operador = {}

    Artigo.find(
        operador
    ).then((json_retorno) => {

        res.json(json_retorno);

    }).catch((erro) => {
        return res.status(400).json({
            message: "Erro no tipo de sintaxe!"
        })
    })

});

//* Adicionar dados ao banco
app.get("/add/", async (req, res) => {

    let dados_user = JSON.parse(req.query['constraints'])

    Artigo.create(dados_user, (err) => {

        if (err) return res.status(500).json({
            message: "Error: Artigo não cadastrado!"
        });
        return res.status(201).json({
            message: "Artigo cadastrado com sucesso!"
        })
    });
});

app.patch('/atualizar/', async (req, res) => {

    let _id = JSON.parse(req.query['identificador'])
    let dados_user = JSON.parse(req.query['constraints'])


    await Artigo.updateOne({
        _id
    }, dados_user, (err) => {

        if (err) return res.status(422).json({
            message: "o usuario nao foi encontrado"
        });
        return res.status(201).json({
            message: "Dados atualizado com sucesso!"
        })
    })

});

//* deletar
app.delete('/deletar/', async (req, res) => {

    let _id = JSON.parse(req.query['identificador'])


    const delet = await Artigo.findOne(
        _id
    )

    if (!delet) {
        res.status(422).json({
            message: 'Usuário não encontrado!'
        })
        return
    }

    try {
        await Artigo.deleteOne(
            _id
        )

        res.status(200).json({
            message: 'Usuário removido com sucesso!'
        })
    } catch (error) {
        res.status(500).json({
            erro: error
        })
    }
})