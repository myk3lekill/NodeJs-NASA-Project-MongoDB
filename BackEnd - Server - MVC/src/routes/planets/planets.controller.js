const { planets } = require('../../models/planets.model'); //We have to Destructure planets from module.export object to run

function getAllPlanets(req, res) {
    return res.status(200).json(planets);//return will avoid bugs because will stop the proces on the line
}

module.exports = {
    getAllPlanets, 
}