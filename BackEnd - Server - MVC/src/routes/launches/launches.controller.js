const { getAllLaunches } = require('../../models/launches.model');//We have to Destructure launches from module.export object to run

function httpGetAllLaunches(req, res) {
   return res.status(200).json(getAllLaunches())
};

module.exports = {
    httpGetAllLaunches,
}