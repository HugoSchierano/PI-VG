import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from "../../redux/actions";
import { Link, useParams } from 'react-router-dom';
import style from "./Detail.module.css";

const Detail = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getVideogame(id))
    }, [dispatch, id]);

    const videogame = useSelector((state) => state.videogame);
    // const genres = videogame.genres;
    // console.log(videogame);
    // function isGenres() {
    //     if (genres[0] === 'No tiene géneros') {return 'No tiene géneros'}
    //     else { return genres.map(el => el + ' - ')} 
    // }

    // isGenres()

    function createMarkup() {
        return { __html: videogame.description };
    }

    return (
        <div>
            {videogame ?
                <><div className={style.h1}>
                    <h1>{videogame.name}</h1>
                </div>
                    <div className={style.detail}>
                        <img className={style.container} src={videogame.image} alt='detail' width='500px' height='700px' />
                        <h2>Generos: {Array.isArray(videogame.genres) ? videogame.genres.map(el => el + ' - ') : 'Géneros no especificados'}</h2>
                        <div dangerouslySetInnerHTML={createMarkup()} />
                        <h4>Fecha de Lanzamiento: {videogame.released}</h4>
                        <h5>Rating: {videogame.rating}</h5>
                        <h6>Plataformas: {Array.isArray(videogame.platforms) ? videogame.platforms.map(el => el + ' - ') : 'Plataformas no especificadas'}</h6>
                    </div></> : <p>Cargando...</p>}
            <Link to='/home'>
                <button className={style.button}>Volver</button>
            </Link>
        </div>
    )
};

export default Detail;