
const express = require('express');
const path = require('path');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')
const mongoose = require('mongoose');

const router = express.Router();





const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Body parser
app.use(express.urlencoded({ extended: false}));




//import models
let Citizen = require('./models/citizen'); 

// parse application/json
app.use(bodyParser.json())
app.use(cors());



//mongodb
async function citizenCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://localhost/POPULATION' ,{ useUnifiedTopology: true,
        useNewUrlParser: true
    });

    return client.db('POPULATION').collection('citizens');
}


//get citizens 

app.get('/', async(req, res) => {
    const Citizen = await citizenCollection();
    res.send(await Citizen.find({}).toArray());
});



//Register
app.post('/citizen', async(req,res) => {
    console.log(req.body)
    const Citizen = await citizenCollection();
    await Citizen.insertOne({
        Firstname: req.body.Firstname,
        Surname: req.body.Lastname,
        Middlename: req.body.Middlename,
        Phonenumber: req.body.Phonenumber,
        stateoforigin: req.body.stateoforigin,
        lga: req.body.lga,
        Gender: req.body.Gender,
        Birth: req.body.Birth,
        Address: req.body.Address,
    })
    res.status(200).send();
    console.log('Submitted')
})





//delete 
app.delete('/:id', async(req,res) => {
    const Citizen = await citizenCollection();
    await Citizen.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})




//population
async function PopulationCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://localhost/POPULATION',{
        useNewUrlParser: true
    });

    return client.db('POPULATION').collection('pops');
}

//get Population
app.get('/census', async(req, res) => {
    const Population = await PopulationCollection();
    res.send(await Population.find({}).toArray());
    
});




app.listen(3000,function(){
    console.log('Backend running on Port 3000');
    console.log('Connected to the database');
    
})
