const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');//We have to Destructure launches from module.export object to run

function httpGetAllLaunches(req, res) {
   return res.status(200).json(getAllLaunches())
};

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    //Validation for inputed data (from Postman)
    if (!launch.mission || !launch.rocket || !launch.launchDate || ! launch.target) {
        return res.status(400).json({
            error: "Missing required launch property"
        });
    }
    launch.launchDate = new Date(launch.launchDate);//now launch date is a date object
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
};

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
}