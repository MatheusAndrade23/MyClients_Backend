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

app.post('/clients', async (req, res) =>{

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

app.get('clients', (req, res) =>{

    
})

// rota inicial

app.get('/', (req,res) =>{

    // mostrar req
    res.json({message:"Salve"})
})

// entregar uma porta

app.listen(process.env.PORT || 5000);