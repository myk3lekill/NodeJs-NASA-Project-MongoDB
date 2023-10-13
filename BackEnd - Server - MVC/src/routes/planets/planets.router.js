const express = require('express');

const { getAllPlanets } = require('./planets.controller');

const planetsRouter = express.Router();//Router is a middleware that groups togeter related routes

planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;