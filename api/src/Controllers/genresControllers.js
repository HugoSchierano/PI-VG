const axios = require('axios');
const { Genre } = require("../db");
const { API_KEY } = process.env;


const getGenres = async () => {
    const genresUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genresInfo = await genresUrl.data.results.map(el => {
        return {
            id: el.id,
            name: el.name
        };
    });
    return genresInfo;
};

const loadDB = async () => {
    let allGenres = await getGenres();
    allGenres.map(el => {
        Genre.findOrCreate({
            where: { id: el.id },
            defaults: { name: el.name }
        })
    })
    console.log('data base cargada');
};

loadDB();


module.exports = { getGenres };