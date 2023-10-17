const { launches } = require('../../models/launches.model');//We have to Destructure launches from module.export object to run

function getAllLaunches(req, res) {
   return res.status(200).json(Array.from(launches.values()));//launches.values() is an IterableIterator that isn't a valid json format. So we use Array.from() to return an array that is a json format.
};

module.exports = {
    getAllLaunches,
}