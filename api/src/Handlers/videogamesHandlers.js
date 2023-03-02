const { videogameCreate, getGameBd, getGameApi, getInfoGame, getAllGames } = require("../Controllers/videogamesControllers");

const getGamesHandler = (async (req, res) => {
    const game = req.query.search;
    try {
        if (game) {
            let infoGame = await getInfoGame(game);
            infoGame ? res.status(200).send(infoGame) :
                res.status(404).send(`No se encuentra un videojuego con el nombre = ${game}`);
        }
        else {
            let allGames = await getAllGames();
            allGames ? res.status(200).send(allGames) :
                res.status(404).send('Loading...');
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});

const getGameIdHandler = (async (req, res) => {
    const gameId = req.params.id;
    try {
        if (gameId && gameId.length === 36) {
            let gameById = await getGameBd(gameId);
            if (gameById) {
                return res.status(200).send(gameById)
            }
            return res.status(404).send(`No se encuentra un videojuego con el ID = ${gameId}`);
        }
        if (gameId && gameId.length !== 36) {
            let gameById = await getGameApi(gameId);
            if (gameById) {
                return res.status(200).send(gameById)
            }
            return res.status(404).send(`No se encuentra un videojuego con el ID = ${gameId}`);
        } else {
            return res.status(404).send(`No se encuentra un videojuego con el ID = ${gameId}`);
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});

const postGameHandler = (async (req, res) => {
    let {
        name,
        image,
        description,
        released,
        rating,
        platforms,
        genres
    } = req.body;
    try {
        let newVideogame = await videogameCreate(
            name,
            image,
            description,
            released,
            rating,
            platforms,
            genres);
        res.status(201).send(`El videogame ${name} fue creado con éxito`);
    } catch (e) {
        res.status(404).send(e.message)
    }
});


module.exports = {
    getGamesHandler,
    getGameIdHandler,
    postGameHandler
}