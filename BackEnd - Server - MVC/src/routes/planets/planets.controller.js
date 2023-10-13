const planets = require('../../models/planets.models')

function getAllPlanets(req, res) {
    return res.status(200).json(planets);//return will avoid bugs because will stop the proces on the line
}

module.exports = {
    getAllPlanets, 
}