const { Videogame, Genre } = require("../db");
const axios = require('axios');
const { API_KEY } = process.env;


const videogameCreate = async (name,
    image,
    description,
    released,
    rating,
    platforms,
    genres) => {
    let newVideogame = await Videogame.create({
        name,
        image,
        description,
        released,
        rating,
        platforms
    })
    let videogameGenres = await Genre.findAll({
        where: { name: genres.map(gen => gen) }
    })
    newVideogame.setGenres(videogameGenres, { through: 'videogames_genres' })
}

const getGameBd = async (gameId) => {
    let gameById = await Videogame.findOne({
        where: { id: gameId },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    let gameByIdData = await gameById.dataValues;
    let gameInfo = {
        image: gameByIdData.image ? gameById.dataValues.image : 'No tiene imagen',
        name: gameByIdData.name ? gameByIdData.name : 'No tiene nombre',
        genres: gameByIdData.genres.length !== 0 ? gameById.dataValues.genres.map(gen => gen.name) : 'Géneros no especificados',
        description: gameByIdData.description ? gameByIdData.description : 'No tiene descripción',
        released: gameByIdData.released ? gameById.dataValues.released : 'No tiene fecha de creación',
        rating: gameByIdData.rating ? gameById.dataValues.rating : 'No tiene puntuación',
        platforms: gameByIdData.platforms.length > 1 ? gameByIdData.platforms.map(pl => pl) : 'Plataformas no especificadas'
    };
    return gameInfo;
};

const getGameApi = async (gameId) => {
    const gameByIdUrl = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
    console.log(gameByIdUrl.data);
    const gameInfoById = await gameByIdUrl.data;
    const infoById = {
        image: gameInfoById.background_image ? gameInfoById.background_image : 'No tiene imagen',
        name: gameInfoById.name ? gameInfoById.name : 'No tiene nombre',
        genres: gameInfoById.genres.length !== 0 ? gameInfoById.genres.map(gen => gen.name) : 'No tiene géneros',
        description: gameInfoById.description ? gameInfoById.description : 'No tiene descripción',
        released: gameInfoById.released ? gameInfoById.released : 'No tiene fecha de lanzamiento',
        rating: gameInfoById.rating ? gameInfoById.rating : 'No tiene puntuaciones',
        platforms: gameInfoById.parent_platforms ? gameInfoById.parent_platforms.map(pl => pl.platform.name) : 'No tiene plataformas'
    };
    return infoById;
};

const getApiGames = async () => {
    let videogamesUrl = [];
    for (let i = 1; i < 6; i++) {
        let videogames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        videogamesUrl = videogamesUrl.concat(videogames.data.results)
    }
    const videogamesInfo = videogamesUrl.map(el => {
        return {
            id: el.id,
            image: el.background_image ? el.background_image : 'No tiene imagen',
            name: el.name,
            genres: el.genres.length !== 0 ? el.genres.map(gen => gen.name) : 'No tiene géneros',
            rating: el.rating,
            platforms: el.platforms.map(pl => pl.platform.name)
        };
    });
    return videogamesInfo;
};

const getDbGames = async () => {
    let gamesDb = await Videogame.findAll({
        attributes: ['image', 'name', 'rating', 'id', 'createdInDb', 'platforms'],
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    return gamesDb.map(game => {
        return {
            ...game.dataValues,
            genres: game.genres.map(gen => gen.name),
            platforms: game.platforms.map(pl => pl.name)
        }
    })
};

const getAllGames = async () => {
    const apiGames = await getApiGames();
    const dbGames = await getDbGames();
    const allGames = apiGames.concat(dbGames);
    return allGames;
};

const getInfoGame = async (game) => {
    let allGames = await getAllGames();
    return infoGame = allGames.filter(el => el.name.toLowerCase().includes(game.toLowerCase()));
};

module.exports = { videogameCreate, getGameBd, getGameApi, getInfoGame, getAllGames };