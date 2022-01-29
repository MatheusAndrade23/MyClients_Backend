// config

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const Client = require('./models/Client')

const cors = require("cors");
app.use(cors());

//forma de ler JSON

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json())

// conectar mongoose

mongoose.connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () {

    console.log('Conectado com MongoDB Atlas!');

}).catch(function (err) {

    console.log(err.message);
})

// rotas da API

app.post(`/${process.env.URL}`, async (req, res) =>{

    // req.body
    const {name, total, contas, contato} = req.body

    const client = {

        name,
        total,
        contas,
        contato
    }

    try{

        //create -> mongoose
        await Client.create(client);
        res.status(201).json({Message: 'Deu bom'})

    }
    catch(error){
        res.status(500).json({Erro: error});
    }
})

// READ

app.get(`/${process.env.URL}`, async (req, res) =>{

    try {
        
        const Clients = await Client.find()
        res.status(200).json(Clients)

    } catch (error) {
        res.status(500).json({Erro: error});
    }
})

// Mostrar Individual

app.get(`/${process.env.URL}/:id`, async (req, res)=>{

    //extrair o dado da req

    const id = req.params.id

    try {

        const client = await Client.findOne({_id: id})
        res.status(200).json(client)
        
    } catch (error) {
        res.status(500).json({Erro: error});
    }
})

// UPDATE PUT/PATCH

app.patch(`/${process.env.URL}/:id`, async (req, res)=>{

    const id = req.params.id

    const {name, total, contas, contato} = req.body

    const client = {

        name,
        total,
        contas,
        contato
    }

    const ClientUpdated = await Client.updateOne({_id: id}, client)

    res.status(200).json(client);

    try {
        
    } catch (error) {
        res.status(500).json({Erro: error});
    }
})

// DELETE

app.delete(`/${process.env.URL}/:id`, async (req, res)=>{

    const id = req.params.id

    const client = await Client.findOne({_id: id})

    try {
        
        await Client.deleteOne({_id: id})
        res.status(200).json({Message: 'Deu bom'})

    } catch (error) {
        res.status(500).json({Erro: error});
    }
})

// rota inicial

app.get('/', (req,res) =>{

    // mostrar req
    res.json({message: Essa é a API do Projeto MyClients})
})

// entregar uma porta

app.listen(process.env.PORT || 5000);