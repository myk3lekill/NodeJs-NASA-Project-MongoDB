const { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } = require('../../models/launches.model');//We have to Destructure launches from module.export object to run

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

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id); //Take id of req as a Number to avoid bug
    if(!existsLaunchWithId(launchId)) {
    // If launch doesn't exist 404 error
    return res.status(404).json({
        error: 'Launch not found'
    });
    }

    // If launch does exist
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);

};

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}