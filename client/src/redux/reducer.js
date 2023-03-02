import {
    GET_VIDEOGAMES,
    GET_VIDEOGAME_BY_NAME,
    GET_GENRES,
    GET_VIDEOGAME,
    POST_CREATE_VIDEOGAME,
    FILTER_BY_SOURCE,
    FILTER_BY_GENRE,
    SORT_BY_NAME,
    SORT_BY_RATING
} from './actions';

const initialState = {
    videogames: [],
    allVideogames: [],
    videogame: [],
    genres: [],
    platforms: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            const platformsApi = action.payload.map(el => el.platforms);
            const platformsArray = Array.from(new Set(platformsApi.flat()));
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
                platforms: platformsArray
            };
        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                videogames: action.payload,
            };
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            };
        case GET_VIDEOGAME:
            return {
                ...state,
                videogame: action.payload
            };
        case POST_CREATE_VIDEOGAME:
            return {
                ...state,
            };
        case FILTER_BY_SOURCE:
            const allVideogames = state.allVideogames;
            const sourceFiltered = action.payload === 'created' ? allVideogames.filter(el => el.id.length === 36) : allVideogames.filter(el => el.id.length !== 36);
            return {
                ...state,
                videogames: action.payload === 'all' ? state.allVideogames : sourceFiltered
            };
        case FILTER_BY_GENRE:
            const allVideogamesGenre = state.allVideogames;
            const filteredByGenre = allVideogamesGenre.filter(el => el.genres.includes(action.payload))
            return {
                ...state,
                videogames: action.payload === 'all' ? [...state.allVideogames] : filteredByGenre
            };
        case SORT_BY_NAME:
            const allVideogamesName = [...state.videogames]
            action.payload === 'asc' ?
            allVideogamesName.sort(function (a, b) {
                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                        return 1;
                    }
                    if (a.name.toUpperCase() < b.name.toUpperCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                allVideogamesName.sort(function (a, b) {
                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                        return -1;
                    }
                    if (a.name.toUpperCase() < b.name.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogames: action.payload === 'all' ? [...state.allVideogames] : allVideogamesName
            };
        case SORT_BY_RATING:
            const allVideogamesRating = [...state.videogames];
            action.payload === 'asc' ?
                allVideogamesRating.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (a.rating < b.rating) {
                        return -1;
                    }
                    return 0;
                }) :
                allVideogamesRating.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (a.rating < b.rating) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogames: action.payload === 'all' ? [...state.allVideogames] : allVideogamesRating
            };
        default:
            return { ...state };
    }
};

export default rootReducer;