import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { getGenres, getVideogames } from "../../redux/actions";
import style from "./Home.module.css";

const Home = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])
    
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])
    return (
        <>
            <h1 className={style.home}>Home</h1>
            {/* BOTON DE CARGAR TODO DE NUEVO */}
            {/* BOTONES DE FILTROS - COMPONENTE FILTROS */}
            {/* PAGINADO - COMPONENTE PAGINADO*/}
            <CardsContainer />
        </>
    )
};

export default Home;