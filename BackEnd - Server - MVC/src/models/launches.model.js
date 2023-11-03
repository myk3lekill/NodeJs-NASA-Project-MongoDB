const launches = new Map();

let latestFlightNumber = 100

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

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
};

function getAllLaunches() {
    return Array.from(launches.values());//launches.values() is an IterableIterator that isn't a valid json format. So we use Array.from() to return an array that is a json format.
};

//Implement the Post request
function addNewLaunch(launch) {
    latestFlightNumber ++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: latestFlightNumber,
    }));
};

function abortLaunchById(launchId) {
    //launches.delete(launchId); DELETE
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted
};

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}