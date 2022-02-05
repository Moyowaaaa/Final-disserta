let mongoose = require('mongoose');

let citizenschema = mongoose.Schema({
    Firstname:{
        type: String,
        required: true
    },
    Surname:{
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: false
    },
    Middlename:{
        type: String,
        required: false
    },
    Phonenumber:{
        type: String,
        required: false
    },
    stateoforigin:{
        type: String,
        required: false
    },
    lga:{
        type: String,
        required: false
    },
    Birth:{
        type: Date,
        required: false
    },
    
    Gender:{
        type: String,
        required: false
    },
    
});

let Citizens = module.exports = mongoose.model('Citizen',citizenschema);

