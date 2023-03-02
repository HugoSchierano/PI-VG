const {getGenres} = require('../Controllers/genresControllers');
const getGenresHandler = (async (req, res) => {
    try {
        let allGenres = await getGenres();
        allGenres.length ?
            res.status(200).send(allGenres) :
            res.status(404).send('No se encontraron los géneros');
    } catch (e) {
        res.status(404).send(e.message)
        console.log(e.message);
    }
});

module.exports = { getGenresHandler }