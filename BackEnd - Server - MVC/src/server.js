const http = require('http');
const app = require('./app');
//const mongoose = require('mongoose');

const { loadPlanetsData } = require('./models/planets.model');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

//MONGO_URL moved to mongo.js

const server = http.createServer(app);

//Event Emitters moved to mongo.js

async function startServer() {
    //Connect Mongo
    await mongoConnect(); //mongoose.connect moved to mongo.js

    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();



