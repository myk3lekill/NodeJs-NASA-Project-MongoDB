const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');//We have to Destructure launches from module.export object to run

function httpGetAllLaunches(req, res) {
   return res.status(200).json(getAllLaunches())
};

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);//now launch date is a date object
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
}