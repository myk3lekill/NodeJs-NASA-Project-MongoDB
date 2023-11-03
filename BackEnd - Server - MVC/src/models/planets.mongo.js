const mongoose = require('mongoose');

//Mongoose Schema
const planetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true
    }
});