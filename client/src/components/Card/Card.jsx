import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {
    return (
        <Link to={`/detail/${props.id}`}>
            <div className={style.card} key={props.id}>
                <img className={style.img} src={props.image} alt="Videogame" />
                <p>{props.name}</p>
                <p>{props.genres.join(' - ')}</p>
            </div>
        </Link>
    )
};

export default Card;