const path = require('path');
const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.router');
const morgan = require('morgan');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));//Middleware Function to remove Access-Control-Allow-Origin
app.use(morgan('combined'));//Middleware function to call morgan log manage package
app.use(express.json());//Middleware Function
app.use(express.static(path.join(__dirname, '..', 'public')));//Middleware function to run the react frontend build directly from server
app.use(planetsRouter);//Middleware Function

app.get('/', (res,req) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = app;