const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const { loadPlanetsData } = require('./models/planets.model');
const { start } = require('repl');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://Myk3le:RrJ63OXQvh2if9B8@cluster0.2cyxg.mongodb.net/?retryWrites=true&w=majority';

const server = http.createServer(app);

//Event Emitter for mongodb connection once
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
});
//Event Emitter for mongodb connection on error
mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function startServer() {
    //Connect Mongo
    await mongoose.connect(MONGO_URL, {
        useUnifiedTopology: true
    }); 

    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();



