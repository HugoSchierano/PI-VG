const { Router } = require("express");
const { getGamesHandler, getGameIdHandler, postGameHandler} = require("../Handlers/videogamesHandlers");
const { validateVideogame } = require("../Middlewares/validatePost");

const videogamesRouter = Router();


videogamesRouter.get('/', getGamesHandler);
videogamesRouter.get('/:id', getGameIdHandler);
videogamesRouter.post('/', validateVideogame, postGameHandler);

module.exports = videogamesRouter;