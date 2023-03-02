const { Router } = require('express');
const videogamesRouter = require("./videogamesRouter");
const genresRouter = require("./genresRouter");
// const { getVideogames, getGame, getGameById, getGenres } = require('../Controllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);

// const getGame = async (game) => {
//     console.log(game, 'function getGame');
//     const gameUrl = await axios.get(`https://api.rawg.io/api/games/${game}?key=${API_KEY}`);
//     const gameInfoByName = await gameUrl.data;
//     const infoByName = {
//         image: gameInfoByName.background_image ? gameInfoByName.background_image : 'No tiene imagen',
//         name: gameInfoByName.name,
//         genres: gameInfoByName.genres.length !== 0 ? gameInfoByName.genres.map(gen => gen.name) : 'No tiene géneros'
//     }
//     return infoByName;
// };


// const getGameById = async (gameId) => {
//     console.log(gameId, 'function id');
//     const gameByIdUrl = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
//     const gameInfoById = await gameByIdUrl.data;
//     const infoById = {
//         image: gameInfoById.background_image ? gameInfoById.background_image : 'No tiene imagen',
//         name: gameInfoById.name,
//         genres: gameInfoById.genres.length !== 0 ? gameInfoById.genres.map(gen => gen.name) : 'No tiene géneros',
//         description: gameInfoById.description,
//         released: gameInfoById.released,
//         rating: gameInfoById.rating,
//         platforms: gameInfoById.parent_platforms.map(pl => pl.platform.name)
//     };
//     return infoById;
// };



module.exports = router;
