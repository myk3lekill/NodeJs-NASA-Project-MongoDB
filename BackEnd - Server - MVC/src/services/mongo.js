const mongoose = require("mongoose")

const MONGO_URL = 'mongodb+srv://Myk3le:RrJ63OXQvh2if9B8@cluster0.2cyxg.mongodb.net/?retryWrites=true&w=majority';

//Event Emitter for mongodb connection once
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
});
//Event Emitter for mongodb connection on error
mongoose.connection.on('error', (err) => {
    console.error(err);
});

//Create a mangoConnect function to export that calls mngoose.connect
async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useUnifiedTopology: true
    }); 
};

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}