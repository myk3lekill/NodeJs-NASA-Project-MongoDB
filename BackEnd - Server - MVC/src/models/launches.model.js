const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

//const launches = new Map();

//let latestFlightNumber = 100
const DEFAULT_FLIGHT_NUMBER = 100

const launch = {
    flightNumber : 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};
// Array save launches method:
// launches.set(launch.flightNumber, launch);
// MongoDB save launches method:
saveLaunch(launch)

async function existsLaunchWithId(launchId) {
    //Array Method;
    //return launches.has(launchId);
    //MongoDb Method
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    })
};

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
    .findOne({}) //find the first one launch from database (using .sort we return the heigest)
    .sort('-flightNumber'); //sort launches from lower to heigest (with - from heigest to lower)
    
    //Validation for no latest launch
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    // Array getting launches method:
    // return Array.from(launches.values());//launches.values() is an IterableIterator that isn't a valid json format. So we use Array.from() to return an array that is a json format.
    // MongoDB getting launches method:
    return await launchesDatabase.find({}, {
        '_id':0,
        '__v':0
    })
};

//Save Launch to MongoDB
async function saveLaunch(launch) {
    //Validation
    const planet = await planets.findOne({
        keplerName: launch.target
    });
    if(!planet) {
        throw new Error('No matching planet found!')
    }

    //Update DB
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,//Update if flightNumber already exixts
    }, launch , { //inserting launch object if flightnumber doesn't exixt)
        upsert: true //Set the upsert function
    });
}

//Implement the Post request with MongoDB
async function scheduleNewLaunch(launch) {
    //1 Increment flightNumber by 1:
    const newFlightNumber = await getLatestFlightNumber() + 1
    //2 Assign a few property by default to the launch Obj:
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber
    });
    //3 Save scheduled launch with assigned property
    await saveLaunch(newLaunch);
}

//Implement the Post request with Array
// function addNewLaunch(launch) {
//     latestFlightNumber ++;
//     launches.set(latestFlightNumber, Object.assign(launch, {
//         success: true,
//         upcoming: true,
//         customers: ['Zero to Mastery', 'NASA'],
//         flightNumber: latestFlightNumber,
//     }));
// };

async function abortLaunchById(launchId) {
    //launches.delete(launchId); DELETE
    //Array Method:
    //const aborted = launches.get(launchId);
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted
    //MongoDb Method:
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });
    //Return based on API Metadata Response
    return aborted.modifiedCount === 1;
};

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    //addNewLaunch,
    scheduleNewLaunch,
    abortLaunchById,
}