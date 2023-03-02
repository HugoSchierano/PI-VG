import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAME_BY_NAME = 'GET_VIDEOGAME_BY_NAME';
export const GET_GENRES = 'GET_GENRES';
export const GET_VIDEOGAME = 'GET_VIDEOGAME';
export const POST_CREATE_VIDEOGAME = 'POST_CREATE_VIDEOGAME';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_RATING = 'SORT_BY_RATING';

export const getVideogames = () => {
    return async function (dispatch) {
        const videogamesData = await axios.get("http://localhost:3001/videogames");
        const videogames = videogamesData.data;
        dispatch({ type: GET_VIDEOGAMES, payload: videogames });
    };
};

export const getVideogameByName = (name) => {
    return async function (dispatch) {
        try {
            const videogameByNameData = await axios.get("http://localhost:3001/videogames?search=" + name);
            const videogameByName = videogameByNameData.data;
            dispatch({ type: GET_VIDEOGAME_BY_NAME, payload: videogameByName });
        } catch (error) {
            return error.message
        }
    };
};

export const getGenres = () => {
    return async function (dispatch) {
        const genresData = await axios.get("http://localhost:3001/genres");
        const genres = genresData.data;
        dispatch({ type: GET_GENRES, payload: genres });
    };
};

export const getVideogame = (id) => {
    return async function (dispatch) {
        const videogameData = await axios.get('http://localhost:3001/videogames/' + id);
        const videogame = videogameData.data;
        dispatch({ type: GET_VIDEOGAME, payload: videogame });
    };
};

export const postCreateVideogame = (payload) => {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/videogames", payload);
        console.log(response);
        dispatch({ type: POST_CREATE_VIDEOGAME, payload: response})
        return response
    };
};

export const filterBySource = (payload) => {
    return {
        type: FILTER_BY_SOURCE,
        payload: payload
    };
};

export const filterByGenre = (payload) => {
    return {
        type: FILTER_BY_GENRE,
        payload: payload
    };
};

export const sortByName = (payload) => {
    return {
        type: SORT_BY_NAME,
        payload: payload
    };
};

export const sortByRating = (payload) => {
    return {
        type: SORT_BY_RATING,
        payload: payload
    };
};

