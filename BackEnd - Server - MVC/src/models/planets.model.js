const { parse } = require('csv-parse');
const path = require('path');
const fs = require('fs');
const planets = require('./planets.mongo');

const results = [];
const habitablePlanets = [];

//Filter habitable planets based on NASA data
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

//Use Promise to process the stream


function loadPlanetsData() {
//When we manage large amount of data is suggested to stream data with node using the stream capability of nodejs
return new Promise((resolve, reject) => { 
    fs.createReadStream(path.join(__dirname, '..', '..', 'data','kepler_data.csv')) //ReadStrem read the raw data in our file as data buffer bytes
        .pipe(parse({ //pipe data from connect kepler_data.csv to parse method to store all data into an array or an object
            //Parameters of the parse method
            comment: '#',
            columns: true,
        }))
        .on('data', async(data) => {
            if (isHabitablePlanet(data)) {
                //Array Method:
                //habitablePlanets.push(data);
                //MongoDB Method:
                await planets.create({ //Upsert instead of Create would avoid duplication at server launces.
                    //We need to respect the requirements of the schema or we receive an error
                    keplerName: data.kepler_name, //only name is required by the Schema
                });
            }
            results.push(data);
        })
        .on('error', (err) => {
            console.log(err);
            reject();
        })
        .on('end', () => {
            // console.log(habitablePlanets.map((planet) => {
            //     return planet['kepler_name'];
            // }));
            console.log(`${habitablePlanets.length} habitable planets found!`);
            console.log('done');
            resolve();
        });
    });
};

function getAllPlanets() {
    return habitablePlanets;
};

 module.exports = {
    loadPlanetsData,
    getAllPlanets,
 };