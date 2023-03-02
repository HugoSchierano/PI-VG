import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Paginado from "../Paginado/Paginado";
import { getVideogames, filterBySource, filterByGenre, sortByName, sortByRating } from "../../redux/actions";

const CardsContainer = () => {
    const videogames = useSelector(state => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const genres = useSelector(state => state.genres);

    const dispatch = useDispatch();

    function handleClick() {
        dispatch(getVideogames());
    }
    function handleFilterSource(e) {
        dispatch(filterBySource(e.target.value))
        setCurrentPage(1)
    }

    function handleSortName(e) {
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
    }

    function handleSortRating(e) {
        dispatch(sortByRating(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterGenre(e) {
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
    }

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <div>
            <div className={style.filters}>
                <label className={style.label}>Filtrar existente/creados
                    <select className={style.select} onChange={(e) => handleFilterSource(e)}>
                        <option value='all'>Todos</option>
                        <option value='api'>Existentes</option>
                        <option value='created'>Creados</option>
                    </select>
                </label>
                <label className={style.label}>Filtrar por generos
                    <select className={style.select} onChange={(e) => handleFilterGenre(e)}>
                        <option value='all'>Todos</option>
                        {
                            genres.map(gen => {
                                return <option key={gen.id} value={gen.name}>{gen.name}</option>
                            })
                        }
                    </select>
                </label>
                <label className={style.label}>Ordenar por nombre
                    <select className={style.select} onChange={(e) => handleSortName(e)}>
                        <option value='all'>Todos</option>
                        <option value='asc'>Acendente</option>
                        <option value='desc'>Descendente</option>
                    </select>
                </label>
                <label className={style.label}>Ordenar por rating
                    <select className={style.select} onChange={(e) => handleSortRating(e)}>
                        <option value='all'>Todos</option>
                        <option value='asc'>Acendente</option>
                        <option value='desc'>Descendente</option>
                    </select>
                </label>
            </div>
            <div className={style.allButton}>
                <button className={style.button} type="button" onClick={handleClick}>Cargar Todos los Videogames</button>
            </div>
            <Paginado
                videogamesPerPage={videogamesPerPage}
                videogames={videogames.length}
                paginado={paginado}
            />
            <div className={style.container} >
                {videogames?.slice(indexOfFirstVideogame, indexOfLastVideogame).map((game) => {
                    return <Card
                        key={game.id}
                        id={game.id}
                        image={game.image}
                        name={game.name}
                        genres={game.genres}
                    />
                })}
            </div>
        </div>
    )
};

export default CardsContainer;