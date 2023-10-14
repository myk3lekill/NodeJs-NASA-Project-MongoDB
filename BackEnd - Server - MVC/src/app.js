const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.router')

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));//Middleware Function to remove Access-Control-Allow-Origin
app.use(express.json());//Middleware Function
app.use(planetsRouter);//Middleware Function


module.exports = app;