'use strict';
let mongoose = require('mongoose');

let publisherSchema = new mongoose.Schema({
    nombre : {type : String, unique : true, required : true},
    pais : {type : String, required : true}
});

module.exports = mongoose.model('Publisher', publisherSchema);