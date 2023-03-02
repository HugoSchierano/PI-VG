const { Router } = require("express");
const { getGenresHandler } = require("../Handlers/genresHandlers");
const genresRouter = Router();

genresRouter.get('/', getGenresHandler);


module.exports = genresRouter;